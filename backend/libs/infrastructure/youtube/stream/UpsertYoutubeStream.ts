import { StreamRepository } from '@domain/youtube'
import type { Prisma } from '@prisma/client'

export class UpsertYoutubeStream {
  constructor(
    private readonly data: Parameters<StreamRepository['save']>[0]['data']
  ) {}

  translateToCreate(): Prisma.YoutubeStreamUpsertArgs['create'] {
    const { group, stream } = this.data

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
    } = stream

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

      group: group.get(),

      updatedAt: new Date()
    }
  }

  translateToUpdate(): Prisma.YoutubeStreamUpsertArgs['update'] {
    const { stream } = this.data

    const {
      snippet: { title, description }
    } = stream

    return {
      title,
      description,
      updatedAt: new Date()
    }
  }
}
