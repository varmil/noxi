import { Stream } from '@domain/youtube'
import type { YoutubeStream as PrismaYoutubeStream } from '@prisma/client'

export class ToPrismaYoutubeStream {
  constructor(private readonly data: Stream) {}

  translate(): PrismaYoutubeStream {
    const {
      videoId,
      snippet: {
        publishedAt,
        channelId,
        title,
        description,
        thumbnails,
        tags,
        categoryId,
        defaultLanguage
      },
      duration,
      streamTimes: { scheduledStartTime, actualStartTime, actualEndTime },
      maxViewerCount,
      chatCount,
      likeCount,
      status
    } = this.data

    return {
      videoId: videoId.get(),
      publishedAt: publishedAt.get(),
      channelId: channelId,
      title: title,
      description,
      thumbnails,
      tags,
      categoryId,
      defaultLanguage: defaultLanguage?.get() ?? null,

      duration: duration?.get() ?? null,

      scheduledStartTime,
      actualStartTime: actualStartTime ?? null,
      actualEndTime: actualEndTime ?? null,
      maxViewerCount,
      chatCount,
      likeCount,

      status: status.get(),

      updatedAt: new Date()
    }
  }
}
