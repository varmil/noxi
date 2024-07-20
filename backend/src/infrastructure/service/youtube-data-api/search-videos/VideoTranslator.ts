import { type youtube_v3 } from '@googleapis/youtube'
import {
  Duration,
  LiveStreamingDetails,
  Snippet,
  Statistics,
  Video
} from '@domain/youtube'

export class VideoTranslator {
  constructor(private readonly v: youtube_v3.Schema$Video) {}

  translate(): Video | undefined {
    const v = this.v
    const { id } = v
    const {
      publishedAt,
      channelId,
      title,
      description,
      thumbnails,
      tags,
      categoryId
    } = v.snippet ?? {}
    const { duration } = v.contentDetails ?? {}
    const { viewCount, likeCount, commentCount } = v.statistics ?? {}
    const { actualStartTime, actualEndTime, concurrentViewers } =
      v.liveStreamingDetails ?? {}

    if (
      !id ||
      !publishedAt ||
      !channelId ||
      !title ||
      !description ||
      !thumbnails ||
      !categoryId ||
      !duration
    ) {
      console.log(
        '[NULL] SearchVideos',
        'id',
        !!id,
        'publishedAt',
        !!publishedAt,
        'channelId',
        !!channelId,
        'title',
        !!title,
        'description',
        !!description,
        'thumbnails',
        !!thumbnails,
        'categoryId',
        !!categoryId,
        'duration',
        !!duration
      )
      return undefined
    }

    return new Video({
      id,
      snippet: new Snippet({
        publishedAt: new Date(publishedAt),
        channelId,
        title,
        description,
        thumbnails,
        tags,
        categoryId
      }),
      duration: new Duration(duration),
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
            actualEndTime: actualEndTime ? new Date(actualEndTime) : undefined,
            concurrentViewers: concurrentViewers
              ? Number(concurrentViewers)
              : undefined
          })
        : undefined
    })
  }
}
