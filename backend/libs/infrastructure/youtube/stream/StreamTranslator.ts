import { LanguageTag } from '@domain/country'
import {
  Duration,
  PublishedAt,
  Snippet,
  Stream,
  StreamTimes,
  VideoId
} from '@domain/youtube'
import type { YoutubeStream as PrismaYoutubeStream } from '@prisma/client'

export class StreamTranslator {
  constructor(private readonly row: PrismaYoutubeStream) {}

  /**
   * Translate PrismaYoutubeStream to Stream
   * @returns
   */
  translate(): Stream {
    const row = this.row

    return new Stream({
      videoId: new VideoId(row.videoId),
      snippet: new Snippet({
        publishedAt: new PublishedAt(row.publishedAt),
        channelId: row.channelId,
        title: row.title,
        description: row.description ?? '',
        thumbnails: row.thumbnails,
        tags: row.tags,
        categoryId: row.categoryId,
        defaultLanguage: row.defaultLanguage
          ? new LanguageTag(row.defaultLanguage)
          : undefined
      }),

      duration: row.duration ? new Duration(row.duration) : undefined,
      streamTimes: new StreamTimes({
        scheduledStartTime: row.scheduledStartTime,
        actualStartTime: row.actualStartTime ?? undefined,
        actualEndTime: row.actualEndTime ?? undefined
      }),

      maxViewerCount: row.maxViewerCount,
      avgConcurrentViewers: row.averageConcurrentViewers,
      chatCount: row.chatCount,
      views: row.views,
      likeCount: row.likeCount
    })
  }
}
