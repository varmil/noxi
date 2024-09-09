import { StreamsService } from '@app/youtube/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { Videos, StreamTimes } from '@domain/youtube'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EndScheduledLivesScenario {
  constructor(
    private readonly streamsService: StreamsService,
    private readonly videosService: VideosService
  ) {}

  /**
   * 既に終了したストリームを抽出しDBを更新する
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
}
