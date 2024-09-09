import { BadRequestException } from '@nestjs/common'
import { Video, Stream } from '@domain/youtube'

/**
 * Stream Create時に用いる
 */
export class VideoToStreamConverter {
  /**
   * Convert video entity to stream entity
   * @param video
   */
  static convert(video: Video): Stream {
    if (!video.liveStreamingDetails) {
      throw new BadRequestException('video.liveStreamingDetails is undefined')
    }

    return new Stream({
      videoId: video.id,
      snippet: video.snippet,
      duration: video.duration,
      streamTimes: video.liveStreamingDetails.streamTimes,
      maxViewerCount: video.liveStreamingDetails.concurrentViewers ?? 0,
      avgConcurrentViewers: 0,
      chatCount: 0,
      views: video.statistics.viewCount,
      likeCount: video.statistics.likeCount
    })
  }
}
