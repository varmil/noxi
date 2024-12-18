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
      await Promise.all([
        // saveViewerCount
        this.streamStatsService.saveViewerCount({
          where: { videoId: video.id },
          data: new Count(video.liveStreamingDetails?.concurrentViewers ?? 0)
        }),
        // updateLikeCount
        this.streamsService.updateLikeCount({
          where: { videoId: video.id },
          data: video.statistics.likeCount
        })
      ])
    })

    await this.promiseService.allSettled(promises)
  }
}
