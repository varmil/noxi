import { Injectable } from '@nestjs/common'
import { StreamStatsService } from '@app/youtube/stream-stats/stream-stats.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { Count, Streams, StreamTimes, Videos } from '@domain/youtube'

@Injectable()
export class MainService {
  constructor(
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService
  ) {}

  /**
   * scheduledStartTime などが変わりうるので、
   * streams vs. videos を見比べて値が更新されていれば、DBを更新
   */
  async saveLatestScheduledData({
    streams,
    videos
  }: {
    streams: Streams
    videos: Videos
  }) {
    const promises = streams.map(async stream => {
      const video = videos.find(video => video.id.equals(stream.videoId))
      if (!video) return

      const { streamScheduledStartTime, statistics } = video

      // update StreamTimes if the latest scheduledStartTime is different
      if (
        streamScheduledStartTime &&
        streamScheduledStartTime.getTime() !==
          stream.streamTimes.scheduledStartTime.getTime()
      ) {
        console.log(
          'update the ScheduledStartTime:',
          JSON.stringify(
            {
              title: video.snippet.title,
              old: stream.streamTimes.scheduledStartTime,
              new: streamScheduledStartTime
            },
            null,
            2
          )
        )
        await this.streamsService.updateStreamTimes({
          where: { videoId: stream.videoId },
          data: new StreamTimes({
            scheduledStartTime: streamScheduledStartTime
          })
        })
      }

      await this.streamsService.updateLikeCount({
        where: { videoId: stream.videoId },
        data: statistics.likeCount
      })
    })

    await Promise.all(promises)
  }

  /**
   * 'live'を抽出しDBを更新する
   *   * Video.liveStreamingDetails.streamTimes.actualStartTime is truely
   * に当てはまれば、DBを更新
   */
  async startScheduledLives(videos: Videos) {
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

    await Promise.all(promises)
  }
}
