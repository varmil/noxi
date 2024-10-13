import { Injectable, Logger } from '@nestjs/common'
import { MainService } from 'apps/update-chats/src/service/main.service'
import { SuperChatsService } from 'apps/update-chats/src/service/super-chats.service'
import { SuperStickersService } from 'apps/update-chats/src/service/super-stickers.service'
import { PromiseService } from '@app/lib/promise-service'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { NextPageToken, PublishedAt, VideoId } from '@domain/youtube'
import { LiveChatMessages } from '@domain/youtube/live-chat-message'

@Injectable()
export class MainScenario {
  private readonly logger = new Logger(MainScenario.name)

  constructor(
    private readonly promiseService: PromiseService,
    private readonly mainService: MainService,
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService,
    private readonly superChatsService: SuperChatsService,
    private readonly superStickersService: SuperStickersService
  ) {}

  async execute(): Promise<void> {
    const lives = await this.mainService.fetchLives()
    const promises = lives.map(async ({ videoId }) => {
      const promises: Promise<void>[] = []

      const res = await this.mainService.fetchNewMessages(videoId)
      if (!res) return
      const { newMessages, nextPageToken } = res

      // chat-counts
      {
        promises.push(
          this.saveChatCounts({ videoId, newMessages, nextPageToken })
        )
      }

      // super-chats, super-stickers
      {
        promises.push(this.superChatsService.save({ videoId, newMessages }))
        promises.push(this.superStickersService.save({ videoId, newMessages }))
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
    nextPageToken
  }: {
    videoId: VideoId
    newMessages: LiveChatMessages
    nextPageToken?: string
  }) {
    await this.streamStatsService.saveChatCount({
      data: {
        videoId,
        all: newMessages.all,
        member: newMessages.member,
        nextPageToken: nextPageToken
          ? new NextPageToken(nextPageToken)
          : undefined,
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

    // TODO:
    // if (items.superChats.length > 0)
    //   console.log(
    //     'saveChatCounts/superChats',
    //     items.superChats.map(
    //       e => e.snippet.superChatDetails?.amountDisplayString
    //     )
    //   )

    // TODO:
    // if (items.superStickers.length > 0)
    //   console.log(
    //     'saveChatCounts/superStickers',
    //     items.superStickers.map(e => e.snippet.type)
    //   )
  }
}
