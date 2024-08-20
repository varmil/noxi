import { Injectable } from '@nestjs/common'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { Streams, StreamTimes, VideoIds } from '@domain/youtube'

@Injectable()
export class MainService {
  constructor(
    private readonly streamsService: StreamsService,
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
      where: {
        ids: new VideoIds(streams.map(stream => stream.videoId))
      },
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
      where: {
        ids: new VideoIds(streams.map(stream => stream.videoId))
      },
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

        await this.streamsService.updateStreamTimes({
          where: { videoId: video.id },
          data: new StreamTimes({
            scheduledStartTime,
            actualStartTime,
            actualEndTime
          })
        })
      })

    await Promise.all(promises)
  }

  /**
   * Live中に変化するStatsをDBに保存する
   */
  async updateStats(streams: Streams) {
    throw new Error('Method not implemented.')
  }
}
