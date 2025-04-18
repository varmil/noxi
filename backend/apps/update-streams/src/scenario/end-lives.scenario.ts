import { Injectable } from '@nestjs/common'
import { ChatDeletingQueuesService } from '@app/chat-deleting-queues/chat-deleting-queues.service'
import { ChatEventsBundleQueuesService } from '@app/chat-events-bundle-queues/chat-events-bundle-queues.service'
import { PromiseService } from '@app/lib/promise-service'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { QueueStatusUnprocessed } from '@domain/queue'
import { Streams, StreamTimes } from '@domain/stream'
import { Video, VideoIds } from '@domain/youtube'

@Injectable()
export class EndLivesScenario {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly chatDeletingQueuesService: ChatDeletingQueuesService,
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService,
    private readonly chatEventsBundleQueuesService: ChatEventsBundleQueuesService,
    private readonly videosService: VideosService
  ) {}

  /**
   * 既に終了したストリームを抽出しDBを更新する
   *
   * * ActualEndTime
   * * Duration
   * * Metrics
   */
  async execute({ streams }: { streams: Streams }): Promise<void> {
    const { items: videos } = await this.videosService.findAll({
      where: { ids: new VideoIds(streams.map(stream => stream.videoId)) },
      limit: streams.length
    })

    const promises = videos
      .filter(video => !!video.liveStreamingDetails?.streamTimes.actualEndTime)
      .map(async video => {
        const { liveStreamingDetails } = video
        if (!liveStreamingDetails) return
        const { actualStartTime, actualEndTime } =
          liveStreamingDetails.streamTimes

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
              actualStartTime,
              actualEndTime
            })
          }),
          // update metrics
          this.updateMetrics(video),
          // Queue chat deleting
          this.chatDeletingQueuesService.save({
            where: { videoId: video.id },
            data: { status: QueueStatusUnprocessed }
          }),
          // Queue chat events bundle (supers)
          this.chatEventsBundleQueuesService.save({
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

    const avgConcurrentViewers = (
      await this.streamStatsService.findAvgViewerCount({
        where: { videoId: id }
      })
    ).get()

    await this.streamsService.updateMetrics({
      where: { videoId: id },
      data: {
        peakConcurrentViewers: undefined,
        avgConcurrentViewers,
        chatMessages: undefined,
        views: viewCount ?? null, // 終了時点での視聴回数
        likes: likeCount // 終了時点での高評価数
      }
    })
  }
}
