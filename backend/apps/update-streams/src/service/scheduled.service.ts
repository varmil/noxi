import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { PromiseService } from '@app/lib/promise-service'
import { StreamsService } from '@app/streams/streams.service'
import { Streams, StreamTimes } from '@domain/stream'
import { ActualEndTime, Video, Videos } from '@domain/youtube'

/**
 * Scheduled Streamsを処理するService
 */
@Injectable()
export class ScheduledService {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly streamsService: StreamsService
  ) {}

  /**
   * scheduledStartTime などが変わりうるので、
   * streams vs. videos を見比べて値が更新されていれば、DBを更新
   */
  async saveLatestData({
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
        streamScheduledStartTime?.getTime() !==
        stream.streamTimes.scheduledStartTime?.getTime()
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

    await this.promiseService.allSettled(promises)
  }

  /**
   * 'live'を抽出しDBを更新する
   *  Video.liveStreamingDetails.streamTimes.actualStartTime is truely
   *  に当てはまれば、DBを更新
   */
  async startLives(videos: Videos) {
    const promises = videos
      .filter(
        video => !!video.liveStreamingDetails?.streamTimes.actualStartTime
      )
      .map(async video => {
        const { liveStreamingDetails } = video
        if (!liveStreamingDetails) return
        const { actualStartTime } = liveStreamingDetails.streamTimes

        console.log('start the stream:', video.id.get())

        await this.streamsService.updateStreamTimes({
          where: { videoId: video.id },
          data: new StreamTimes({ actualStartTime })
        })
      })

    await this.promiseService.allSettled(promises)
  }

  /**
   * フリーチャット、オフラインライブなど特殊なものを閉じる
   *
   * 具体的には、
   * フリーチャット ：公開予定が大幅に過去の日付
   * オフライン     ：streamScheduledStartTime = NULL && publishedAtが大幅に過去の日付
   */
  async endLives(videos: Videos) {
    const isFreeChat = (video: Video) => {
      return video.streamScheduledStartTime
        ? dayjs(video.streamScheduledStartTime).isBefore(
            dayjs().subtract(1, 'day')
          )
        : false
    }
    const isOffline = (video: Video) => {
      return (
        video.streamScheduledStartTime === undefined &&
        dayjs(video.snippet.publishedAt.get()).isBefore(
          dayjs().subtract(3, 'days')
        )
      )
    }
    const promises = videos
      .filter(video => isFreeChat(video) || isOffline(video))
      .map(async video => {
        const { liveStreamingDetails } = video
        if (!liveStreamingDetails) return
        const { scheduledStartTime, actualStartTime, actualEndTime } =
          liveStreamingDetails.streamTimes

        console.log('end scheduled stream:', video.id.get())

        await this.streamsService.updateStreamTimes({
          where: { videoId: video.id },
          data: new StreamTimes({
            scheduledStartTime,
            actualStartTime,
            actualEndTime: actualEndTime || new ActualEndTime(new Date()) // 強引に閉じる
          })
        })
      })

    await this.promiseService.allSettled(promises)
  }
}
