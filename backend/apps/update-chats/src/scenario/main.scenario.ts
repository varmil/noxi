import { Injectable } from '@nestjs/common'
import { MainService } from 'apps/update-chats/src/service/main.service'
import { StreamStatsService } from '@app/youtube/stream-stats/stream-stats.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { allSettled } from '@domain/lib/promise/allSettled'
import { StreamStatuses, StreamStatus } from '@domain/stream'
import { VideoId } from '@domain/youtube'
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

  private async fetchLives() {
    return await this.streamsService.findAll({
      where: {
        status: new StreamStatuses([new StreamStatus('live')])
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })
  }

  private async saveChatCounts(videoId: VideoId) {
    // 前回の結果を取得
    {
      const latestChatCount = await this.streamStatsService.findLatestChatCount(
        {
          where: { videoId }
        }
      )
      if (latestChatCount)
        console.log('saveChatCounts/latestChatCount', latestChatCount)
    }

    // TODO: liveChatIdをStreamから取れるようにする
    {
      const video = await this.videosService.findById(videoId)
      if (!video) throw new Error('video not found')
      const liveChatId = video.liveStreamingDetails?.activeLiveChatId
      if (!liveChatId) throw new Error('liveChatId not found')
      const liveChatMessages = await this.liveChatMessagesInfraService.list({
        liveChatId
      })
      console.log('saveChatCounts/length', liveChatMessages.items.length)
      if (liveChatMessages.items.superChats.length > 0)
        console.log(
          'saveChatCounts/liveChatMessages',
          liveChatMessages.items.superChats.map(
            e => e.snippet.superChatDetails?.amountDisplayString
          )
        )
    }
  }
}
