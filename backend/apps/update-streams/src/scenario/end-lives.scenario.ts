import { Injectable } from '@nestjs/common'
import { ChatBundleQueuesService } from '@app/chat-bundle-queues/chat-bundle-queues.service'
import { PromiseService } from '@app/lib/promise-service'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { QueueStatusUnprocessed } from '@domain/queue'
import { StreamTimes } from '@domain/stream'
import { Videos, Video } from '@domain/youtube'

@Injectable()
export class EndLivesScenario {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly chatBundleQueuesService: ChatBundleQueuesService,
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService
  ) {}

  /**
   * 既に終了したストリームを抽出しDBを更新する
   *
   * * ActualEndTime
   * * Duration
   * * Metrics
   */
  async execute(videos: Videos): Promise<void> {
    const promises = videos
      .filter(video => !!video.liveStreamingDetails?.streamTimes.actualEndTime)
      .map(async video => {
        const { liveStreamingDetails } = video
        if (!liveStreamingDetails) return
        const { scheduledStartTime, actualStartTime, actualEndTime } =
          liveStreamingDetails.streamTimes

        console.log('end the stream:', video.snippet.title)

        await this.promiseService.allSettled([
          // save duration here because it is not available while live
          this.streamsService.updateDuration({
            where: { videoId: video.id },
            data: video.duration
          }),
          // save actualEndTime
          this.streamsService.updateStreamTimes({
            where: { videoId: video.id },
            data: new StreamTimes({
              scheduledStartTime,
              actualStartTime,
              actualEndTime
            })
          }),
          // update metrics
          this.updateMetrics(video),
          // Queue chat bundle
          this.chatBundleQueuesService.save({
            where: { videoId: video.id },
            data: { status: QueueStatusUnprocessed }
          })
        ])
      })

    await this.promiseService.allSettled(promises)
  }

  private async updateMetrics(video: Video) {
    const {
      id,
      statistics: { viewCount, likeCount }
    } = video

    const avgConcurrentViewers =
      await this.streamStatsService.findAvgViewerCount({
        where: { videoId: id }
      })

    console.log(
      'avgConcurrentViewers',
      avgConcurrentViewers,
      'views',
      viewCount
    )

    await this.streamsService.updateMetrics({
      where: { videoId: id },
      data: {
        peakConcurrentViewers: undefined,
        avgConcurrentViewers: avgConcurrentViewers.get(),
        chatMessages: undefined,
        views: viewCount, // 終了時点での視聴回数
        likes: likeCount // 終了時点での高評価数
      }
    })
  }
}
