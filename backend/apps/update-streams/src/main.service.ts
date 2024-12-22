import { Injectable } from '@nestjs/common'
import { PromiseService } from '@app/lib/promise-service'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { Count } from '@domain/stream-stats'
import { Videos } from '@domain/youtube'

@Injectable()
export class MainService {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService
  ) {}

  /**
   * Live中に変化するStatsをDBに保存する
   */
  async updateStats(videos: Videos) {
    const promises = videos.map(async video => {
      const {
        id,
        statistics: { viewCount, likeCount },
        liveStreamingDetails: { concurrentViewers } = {}
      } = video
      await Promise.all([
        // saveViewerCount
        this.streamStatsService.saveViewerCount({
          where: { videoId: id },
          data: new Count(concurrentViewers ?? 0)
        }),
        // updateMetrics
        this.streamsService.updateMetrics({
          where: { videoId: id },
          data: {
            views: viewCount ?? null,
            likes: likeCount
          }
        })
      ])
    })

    await this.promiseService.allSettled(promises)
  }
}
