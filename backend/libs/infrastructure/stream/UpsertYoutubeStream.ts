import { Stream } from '@domain/stream'
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
      channelId: channelId.get(),
      title,
      description,
      thumbnails,
      tags,
      categoryId,
      defaultLanguage: defaultLanguage?.get() ?? null,
      duration: duration?.get() ?? null,
      scheduledStartTime,
      actualStartTime: actualStartTime?.get() ?? null,
      actualEndTime: actualEndTime?.get() ?? null,

      maxViewerCount,
      averageConcurrentViewers: avgConcurrentViewers,
      chatMessages,
      views: views ?? null,
      likeCount,

      group: group.get(),
      status: status.get()
    }
  }

  translateToUpdate(): Prisma.YoutubeStreamUpsertArgs['update'] {
    const {
      snippet: { title, description },
      metrics: {
        // 2024/12/22 非メン限でもNULLになっている場合がある
        // hUCで初回メン限で作成し、その後は非メン限に変更されたという仮説
        // 従って、hUC経由のUPDATEでも毎回viewsを更新する
        views
      }
    } = this.stream

    return {
      title,
      description,
      views: views ?? null
    }
  }
}
