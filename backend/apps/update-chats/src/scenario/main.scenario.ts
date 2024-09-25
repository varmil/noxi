import { Injectable } from '@nestjs/common'
import { MainService } from 'apps/update-chats/src/service/main.service'
import { StreamStatsService } from '@app/youtube/stream-stats/stream-stats.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { allSettled } from '@domain/lib/promise/allSettled'
import { StreamStatuses, StreamStatus } from '@domain/stream'
import { VideoId } from '@domain/youtube'

@Injectable()
export class MainScenario {
  constructor(
    private readonly mainService: MainService,
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService
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
      console.log('saveChatCounts/latestChatCount', latestChatCount)
    }
  }
}
