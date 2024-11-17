import { Injectable } from '@nestjs/common'
import { MainService } from 'apps/update-chats/src/service/main.service'
import { SaveSuperChatsService } from 'apps/update-chats/src/service/save-super-chats.service'
import { SaveSuperStickersService } from 'apps/update-chats/src/service/save-super-stickers.service'
import { PromiseService } from '@app/lib/promise-service'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { PublishedAt, VideoId } from '@domain/youtube'
import { LiveChatMessages } from '@domain/youtube/live-chat-message'
import { Continuation } from '@domain/youtubei/live-chat'

@Injectable()
export class MainScenario {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly mainService: MainService,
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService,
    private readonly saveSuperChatsService: SaveSuperChatsService,
    private readonly saveSuperStickersService: SaveSuperStickersService
  ) {}

  async execute(): Promise<void> {
    const lives = await this.mainService.fetchLives()
    const promises = lives.map(async stream => {
      const videoId = stream.videoId
      const promises: Promise<void>[] = []

      const res = await this.mainService.fetchNewMessages(stream)
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
          this.saveSuperChatsService.execute({ videoId, newMessages })
        )
        promises.push(
          this.saveSuperStickersService.execute({ videoId, newMessages })
        )
      }

      // TODO: new-members
      // {}

      await this.promiseService.allSettled(promises)
    })

    await this.promiseService.allSettled(promises)
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
    await this.streamStatsService.saveChatCount({
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

    await this.streamsService.updateMetrics({
      where: { videoId },
      data: {
        chatMessages: { increment: newMessages.all.get() }
      }
    })
  }
}
