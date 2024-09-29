import { type youtube_v3 } from '@googleapis/youtube'
import { z } from 'zod'
import { LanguageTag } from '@domain/country'
import { StreamTimes } from '@domain/stream'
import {
  Duration,
  LiveStreamingDetails,
  PublishedAt,
  Snippet,
  Statistics,
  Video,
  VideoId
} from '@domain/youtube'
import { LiveChatId } from '@domain/youtube/live-chat-message'
import { videoAPISchema } from './VideoAPISchema'

export class VideoTranslator {
  constructor(private readonly v: youtube_v3.Schema$Video) {}

  translate(): Video | undefined {
    const v = this.parse()
    if (!v) return undefined

    const { publishedAt, categoryId, defaultLanguage, ...sRest } = v.snippet
    const { viewCount, likeCount, commentCount } = v.statistics
    const {
      actualStartTime,
      actualEndTime,
      concurrentViewers,
      activeLiveChatId
    } = v.liveStreamingDetails ?? {}

    return new Video({
      id: new VideoId(v.id),
      snippet: new Snippet({
        ...sRest,
        publishedAt: new PublishedAt(new Date(publishedAt)),
        categoryId: Number(categoryId),
        defaultLanguage: defaultLanguage
          ? new LanguageTag(defaultLanguage)
          : undefined
      }),
      duration: new Duration(v.contentDetails.duration),
      statistics: new Statistics({
        viewCount: Number(viewCount ?? 0),
        likeCount: Number(likeCount ?? 0),
        commentCount: Number(commentCount ?? 0)
      }),
      liveStreamingDetails: v.liveStreamingDetails
        ? new LiveStreamingDetails({
            streamTimes: new StreamTimes({
              scheduledStartTime: new Date(
                v.liveStreamingDetails.scheduledStartTime
              ),
              actualStartTime: actualStartTime
                ? new Date(actualStartTime)
                : undefined,
              actualEndTime: actualEndTime ? new Date(actualEndTime) : undefined
            }),
            concurrentViewers: concurrentViewers
              ? Number(concurrentViewers)
              : undefined,
            activeLiveChatId: activeLiveChatId
              ? new LiveChatId(activeLiveChatId)
              : undefined
          })
        : undefined
    })
  }

  private parse() {
    try {
      return videoAPISchema.parse(this.v)
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log('VideoTranslator', err.issues)
        return undefined
      } else {
        throw err
      }
    }
  }
}
