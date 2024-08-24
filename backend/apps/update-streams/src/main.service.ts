import { Injectable } from '@nestjs/common'
import { StreamStatsService } from '@app/youtube/stream-stats/stream-stats.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { Count, Streams, StreamTimes, VideoIds } from '@domain/youtube'

@Injectable()
export class MainService {
  constructor(
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService,
    private readonly videosService: VideosService
  ) {}

  /**
   * 'live'を抽出しDBを更新する
   *   * Stream.streamTimes.scheduledStartTime > 現在時刻
   *   * Video.liveStreamingDetails.streamTimes.actualStartTime is truely
   * のどちらかに当てはまれば、DBを更新
   */
  async startScheduledLives(streams: Streams) {
    const { items: videos } = await this.videosService.findAll({
      where: { ids: new VideoIds(streams.map(stream => stream.videoId)) },
      limit: 1000
    })

    const promises = videos
      .filter(
        video => !!video.liveStreamingDetails?.streamTimes.actualStartTime
      )
      .map(async video => {
        const { liveStreamingDetails } = video
        if (!liveStreamingDetails) return
        const { scheduledStartTime, actualStartTime } =
          liveStreamingDetails.streamTimes

        console.log('start the stream:', video.snippet.title)

        await this.streamsService.updateStreamTimes({
          where: { videoId: video.id },
          data: new StreamTimes({
            scheduledStartTime,
            actualStartTime
          })
        })
      })

    await Promise.all(promises)
  }

  /**
   * 既に終了したストリームを抽出しDBを更新する
   */
  async endScheduledLives(streams: Streams): Promise<void> {
    const { items: videos } = await this.videosService.findAll({
      where: { ids: new VideoIds(streams.map(stream => stream.videoId)) },
      limit: 1000
    })

    const promises = videos
      .filter(video => !!video.liveStreamingDetails?.streamTimes.actualEndTime)
      .map(async video => {
        const { liveStreamingDetails } = video
        if (!liveStreamingDetails) return
        const { scheduledStartTime, actualStartTime, actualEndTime } =
          liveStreamingDetails.streamTimes

        console.log('end the stream:', video.snippet.title)

        await Promise.all([
          // save actualEndTime
          await this.streamsService.updateStreamTimes({
            where: { videoId: video.id },
            data: new StreamTimes({
              scheduledStartTime,
              actualStartTime,
              actualEndTime
            })
          }),
          // save duration here because it is not available while live
          await this.streamsService.updateDuration({
            where: { videoId: video.id },
            data: video.duration
          })
        ])
      })

    await Promise.all(promises)
  }

  /**
   * Live中に変化するStatsをDBに保存する
   */
  async updateStats(streams: Streams) {
    const { items: videos } = await this.videosService.findAll({
      where: { ids: new VideoIds(streams.map(stream => stream.videoId)) },
      limit: 1000
    })

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

    await Promise.all(promises)
  }
}
