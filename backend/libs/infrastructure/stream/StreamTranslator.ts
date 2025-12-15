import { LanguageTag } from '@domain/country'
import { GroupName } from '@domain/group'
import { Metrics, Stream, StreamTimes } from '@domain/stream'
import {
  ActualEndTime,
  ActualStartTime,
  ChannelId,
  Duration,
  PublishedAt,
  VideoSnippet,
  VideoId,
  UpdatedAt,
  VideoTitle
} from '@domain/youtube'
import type { YoutubeStream as PrismaYoutubeStream } from '@prisma/generated/client'

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
      snippet: new VideoSnippet({
        publishedAt: new PublishedAt(row.publishedAt),
        channelId: new ChannelId(row.channelId),
        title: new VideoTitle(row.title),
        thumbnails: row.thumbnails,
        tags: row.tags,
        categoryId: row.categoryId,
        defaultLanguage: row.defaultLanguage
          ? new LanguageTag(row.defaultLanguage)
          : undefined
      }),

      duration: row.duration ? new Duration(row.duration) : undefined,

      streamTimes: new StreamTimes({
        scheduledStartTime: row.scheduledStartTime ?? undefined,
        actualStartTime: row.actualStartTime
          ? new ActualStartTime(row.actualStartTime)
          : undefined,
        actualEndTime: row.actualEndTime
          ? new ActualEndTime(row.actualEndTime)
          : undefined
      }),

      metrics: new Metrics({
        peakConcurrentViewers: row.maxViewerCount,
        avgConcurrentViewers: row.averageConcurrentViewers,
        chatMessages: row.chatMessages,
        views: row.views ?? undefined,
        likes: row.likeCount
      }),

      group: new GroupName(row.group),
      updatedAt: new UpdatedAt(row.updatedAt)
    })
  }
}
