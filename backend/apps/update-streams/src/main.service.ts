import { Injectable } from '@nestjs/common'
import { StreamStatsService } from '@app/youtube/stream-stats/stream-stats.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { allSettled } from '@domain/lib/promise/allSettled'
import { Streams, StreamTimes } from '@domain/stream'
import { Videos } from '@domain/youtube'
import { Count } from '@domain/stream-stats'

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

      const {
        snippet: { thumbnails },
        streamScheduledStartTime,
        statistics
      } = video

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

      // maxresのサムネイルが初回saveで生成されない場合があるのでここでチェック
      if (thumbnails.maxres && !stream.snippet.thumbnails.maxres) {
        console.log(
          'update the maxres thumbnail:',
          JSON.stringify({ title: video.snippet.title }, null, 2)
        )
        await this.streamsService.updateThumbnails({
          where: { videoId: stream.videoId },
          data: thumbnails
        })
      }

      await this.streamsService.updateLikeCount({
        where: { videoId: stream.videoId },
        data: statistics.likeCount
      })
    })

    await allSettled(promises)
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

    await allSettled(promises)
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

    await allSettled(promises)
  }
}
