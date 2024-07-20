import { type youtube_v3 } from '@googleapis/youtube'
import { z } from 'zod'
import {
  Duration,
  LiveStreamingDetails,
  Snippet,
  Statistics,
  Video
} from '@domain/youtube'
import { searchVideosAPISchema } from '@infra/service/youtube-data-api/search-videos/SearchVideosAPISchema'

export class VideoTranslator {
  constructor(private readonly v: youtube_v3.Schema$Video) {}

  translate(): Video | undefined {
    try {
      const v = searchVideosAPISchema.parse(this.v)

      const { viewCount, likeCount, commentCount } = v.statistics
      const { actualStartTime, actualEndTime, concurrentViewers } =
        v.liveStreamingDetails ?? {}

      return new Video({
        id: v.id,
        snippet: new Snippet({
          ...v.snippet,
          publishedAt: new Date(v.snippet.publishedAt)
        }),
        duration: new Duration(v.contentDetails.duration),
        statistics: new Statistics({
          viewCount: Number(viewCount ?? 0),
          likeCount: Number(likeCount ?? 0),
          commentCount: Number(commentCount ?? 0)
        }),
        liveStreamingDetails: v.liveStreamingDetails
          ? new LiveStreamingDetails({
              actualStartTime: actualStartTime
                ? new Date(actualStartTime)
                : undefined,
              actualEndTime: actualEndTime
                ? new Date(actualEndTime)
                : undefined,
              concurrentViewers: concurrentViewers
                ? Number(concurrentViewers)
                : undefined
            })
          : undefined
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues)
        return undefined
      } else {
        throw err
      }
    }
  }
}
