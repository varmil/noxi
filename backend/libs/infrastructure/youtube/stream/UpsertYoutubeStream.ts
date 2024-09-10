import { Stream } from '@domain/youtube'
import type { Prisma } from '@prisma/client'

export class UpsertYoutubeStream {
  constructor(private readonly stream: Stream) {}

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
      metrics: {
        peakConcurrentViewers: maxViewerCount,
        avgConcurrentViewers,
        chatMessages,
        views,
        likes: likeCount
      },
      group,
      status
    } = this.stream

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
      averageConcurrentViewers: avgConcurrentViewers,
      chatMessages,
      views,
      likeCount,

      group: group.get(),
      status: status.get(),
      updatedAt: new Date()
    }
  }

  translateToUpdate(): Prisma.YoutubeStreamUpsertArgs['update'] {
    const {
      snippet: { title, description }
    } = this.stream

    return {
      title,
      description,
      updatedAt: new Date()
    }
  }
}
