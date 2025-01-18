import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { StreamsService } from '@app/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { StreamTimes } from '@domain/stream'
import { VideoId } from '@domain/youtube'

@Injectable()
export class CallbackService {
  private readonly logger = new Logger(CallbackService.name)

  constructor(
    private readonly streamsService: StreamsService,
    private readonly videosService: VideosService
  ) {}

  /**
   * Video.liveStreamingDetails.streamTimes を取得する
   * すでにVideoが削除されている（or非公開）場合、かわりにStreamを使う
   *
   * @param videoId
   * @returns StreamTimes
   */
  async findStreamTimes(videoId: VideoId): Promise<StreamTimes> {
    const video = await this.videosService.findById(videoId)
    if (video?.liveStreamingDetails) {
      return video.liveStreamingDetails.streamTimes
    }

    this.logger.warn(
      'hDC video not found, so try to use stream:',
      videoId.get()
    )

    const stream = await this.streamsService.findOne({
      where: { videoId }
    })
    if (stream?.streamTimes) {
      return stream.streamTimes
    }

    throw new NotFoundException(
      `No videos or streams found for ${videoId.get()}`
    )
  }
}
