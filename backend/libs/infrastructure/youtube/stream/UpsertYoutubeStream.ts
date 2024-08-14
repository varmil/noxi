import { Stream } from '@domain/youtube'
import type { Prisma } from '@prisma/client'

export class UpsertYoutubeStream {
  constructor(private readonly data: Stream) {}

  translateToCreate(): Prisma.YoutubeStreamUpsertArgs['create'] {
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
      channelId,
      title,
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

  translateToUpdate(): Prisma.YoutubeStreamUpsertArgs['update'] {
    const {
      snippet: { title, description }
    } = this.data

    return {
      title,
      description,
      updatedAt: new Date()
    }
  }
}
