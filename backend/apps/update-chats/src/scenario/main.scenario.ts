import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { MainService } from 'apps/update-chats/src/service/main.service'
import { StreamStatsService } from '@app/youtube/stream-stats/stream-stats.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { allSettled } from '@domain/lib/promise/allSettled'
import { StreamStatuses, StreamStatus } from '@domain/stream'
import { NextPageToken, PublishedAt, VideoId } from '@domain/youtube'
import { LiveChatMessagesInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class MainScenario {
  constructor(
    private readonly mainService: MainService,
    private readonly liveChatMessagesInfraService: LiveChatMessagesInfraService,
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService,
    private readonly videosService: VideosService
  ) {}

  async execute(): Promise<void> {
    const lives = await this.fetchLives()
    const promises = lives.map(async ({ videoId }) => {
      const promises: Promise<void>[] = []
      // chat-counts
      {
        promises.push(this.saveChatCounts(videoId))
      }

      // TODO: super-chats, super-stickers
      // {}

      // TODO: new-members
      // {}
      await allSettled(promises)
    })

    await allSettled(promises)
  }

  /** とりあえず開始３時間前から取得する */
  private async fetchLives() {
    return await this.streamsService.findAll({
      where: {
        status: new StreamStatuses([
          new StreamStatus('scheduled'),
          new StreamStatus('live')
        ]),
        scheduledBefore: dayjs().add(3, 'hours').toDate()
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })
  }

  private async saveChatCounts(videoId: VideoId) {
    // setup TODO: liveChatIdをStreamから取れるようにする
    const video = await this.videosService.findById(videoId)
    if (!video) return
    const liveChatId = video.liveStreamingDetails?.activeLiveChatId
    if (!liveChatId) return

    // 前回の結果を取得
    const latestChatCount = await this.streamStatsService.findLatestChatCount({
      where: { videoId }
    })

    const { items, nextPageToken } =
      await this.liveChatMessagesInfraService.list({
        liveChatId,
        pageToken: latestChatCount?.nextPageToken
      })

    const newMessages = items.selectNewerThan(
      latestChatCount?.latestPublishedAt
    )

    if (
      video.snippet.channelId === 'UC-hM6YJuNYVAmUWxeIr9FeA' ||
      video.snippet.channelId === 'UC1DCedRgGHBdm81E1llLhOQ'
    ) {
      console.log(
        `saveChatCounts/${video.snippet.title}`,
        JSON.stringify(
          {
            first: newMessages.first(),
            last: newMessages.latestPublishedAt?.get()
          },
          null,
          2
        )
      )
    }

    console.log(
      'saveChatCounts/newMessages',
      JSON.stringify(
        {
          title: video.snippet.title,
          videoId: videoId.get(),
          all: newMessages.all.get(),
          member: newMessages.member.get()
        },
        null,
        2
      )
    )

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
