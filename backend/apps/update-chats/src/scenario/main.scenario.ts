import { Injectable, Logger } from '@nestjs/common'
import { MainService } from 'apps/update-chats/src/service/main.service'
import { SaveMembershipsService } from 'apps/update-chats/src/service/save-memberships.service'
import { SaveSuperChatsService } from 'apps/update-chats/src/service/save-super-chats.service'
import { SaveSuperStickersService } from 'apps/update-chats/src/service/save-super-stickers.service'
import { PromiseService } from '@app/lib/promise-service'
import { ChatCountsService } from '@app/stream-stats/chat-counts.service'
import { PublishedAt, VideoId } from '@domain/youtube'
import { LiveChatMessages } from '@domain/youtube/live-chat-message'
import { Continuation } from '@domain/youtubei/live-chat'

@Injectable()
export class MainScenario {
  private readonly CHUNK_SIZE = 100
  private readonly logger = new Logger(MainScenario.name)

  constructor(
    private readonly promiseService: PromiseService,
    private readonly mainService: MainService,
    private readonly chatCountsService: ChatCountsService,
    private readonly saveMembershipsService: SaveMembershipsService,
    private readonly saveSuperChatsService: SaveSuperChatsService,
    private readonly saveSuperStickersService: SaveSuperStickersService
  ) {}

  async execute(): Promise<void> {
    let offset = 0
    const index = (offset: number) => offset / this.CHUNK_SIZE

    while (true) {
      try {
        const streams = await this.mainService.fetchLives({
          limit: this.CHUNK_SIZE,
          offset
        })
        if (streams.length === 0) break
        offset += this.CHUNK_SIZE

        const promises = streams.map(async stream => {
          const { videoId, title, group } = stream
          const promises: Promise<void>[] = []

          const res = await this.mainService.fetchNewMessages({
            videoId,
            title
          })
          if (!res) return
          const { newMessages, nextContinuation } = res

          // chat-counts
          {
            promises.push(
              this.saveChatCounts({
                videoId,
                newMessages,
                nextContinuation
              })
            )
          }

          // super-chats, super-stickers
          {
            promises.push(
              this.saveSuperChatsService.execute({
                videoId,
                newMessages,
                group
              })
            )
            promises.push(
              this.saveSuperStickersService.execute({
                videoId,
                newMessages,
                group
              })
            )
          }

          // new-members & membership gift
          {
            promises.push(
              this.saveMembershipsService.execute({
                videoId,
                newMessages,
                group
              })
            )
          }

          await this.promiseService.allSettled(promises)
        })

        await this.promiseService.allSettled(promises)
        this.logger.log(`execute/chunk: ${index(offset)}`)
      } catch (e) {
        this.logger.error(`Error in chunk: ${index(offset)}:`, e)
      }
    }
  }

  private async saveChatCounts({
    videoId,
    newMessages,
    nextContinuation
  }: {
    videoId: VideoId
    newMessages: LiveChatMessages
    nextContinuation?: Continuation
  }) {
    await this.chatCountsService.save({
      data: {
        videoId,
        all: newMessages.all,
        member: newMessages.member,
        nextContinuation,
        latestPublishedAt:
          newMessages.latestPublishedAt ?? new PublishedAt(new Date()),
        createdAt: new Date()
      }
    })
  }
}
