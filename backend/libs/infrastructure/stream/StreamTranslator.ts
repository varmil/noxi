import { LanguageTag } from '@domain/country'
import { Group } from '@domain/group'
import { Metrics, Stream, StreamTimes } from '@domain/stream'
import { Duration, PublishedAt, Snippet, VideoId } from '@domain/youtube'
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

      metrics: new Metrics({
        peakConcurrentViewers: row.maxViewerCount,
        avgConcurrentViewers: row.averageConcurrentViewers,
        chatMessages: row.chatMessages,
        views: row.views,
        likes: row.likeCount
      }),

      group: new Group(row.group)
    })
  }
}
