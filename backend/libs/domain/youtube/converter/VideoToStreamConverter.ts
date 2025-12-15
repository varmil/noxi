import { BadRequestException } from '@nestjs/common'
import { GroupName } from '@domain/group'
import { Stream, Metrics } from '@domain/stream'
import { UpdatedAt, Video } from '@domain/youtube'

/**
 * Stream Create時に用いる
 */
export class VideoToStreamConverter {
  /**
   * Convert video entity to stream entity
   * @param video
   */
  static convert({ group, video }: { group: GroupName; video: Video }): Stream {
    if (!video.liveStreamingDetails) {
      throw new BadRequestException(
        `${video.id.get()} liveStreamingDetails is undefined`
      )
    }

    return new Stream({
      videoId: video.id,
      snippet: video.snippet,
      duration: video.duration,
      streamTimes: video.liveStreamingDetails.streamTimes,
      metrics: new Metrics({
        peakConcurrentViewers:
          video.liveStreamingDetails.concurrentViewers ?? 0,
        avgConcurrentViewers: 0,
        chatMessages: 0,
        views: video.statistics.viewCount,
        likes: video.statistics.likeCount
      }),
      group,
      updatedAt: new UpdatedAt(new Date())
    })
  }
}
