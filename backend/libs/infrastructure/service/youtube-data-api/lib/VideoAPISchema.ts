import { z } from 'zod'

export const videoAPISchema = z.object({
  id: z.string(),

  snippet: z.object({
    publishedAt: z.string().datetime(),
    channelId: z.string(),
    title: z.string(),
    thumbnails: z.object({
      default: z
        .object({
          url: z.string(),
          width: z.number().optional(),
          height: z.number().optional()
        })
        .optional(),
      medium: z
        .object({
          url: z.string(),
          width: z.number().optional(),
          height: z.number().optional()
        })
        .optional(),
      high: z
        .object({
          url: z.string(),
          width: z.number().optional(),
          height: z.number().optional()
        })
        .optional(),
      standard: z
        .object({
          url: z.string(),
          width: z.number().optional(),
          height: z.number().optional()
        })
        .optional(),
      maxres: z
        .object({
          url: z.string(),
          width: z.number().optional(),
          height: z.number().optional()
        })
        .optional()
    }),
    tags: z.array(z.string()).optional(),
    categoryId: z.string(),
    defaultLanguage: z.string().optional()
  }),

  contentDetails: z.object({
    duration: z.string().duration().optional()
  }),

  statistics: z.object({
    viewCount: z.string().min(0).optional(),
    likeCount: z.string().min(0).optional(),
    commentCount: z.string().min(0).optional()
  }),

  liveStreamingDetails: z
    .object({
      scheduledStartTime: z.string().datetime().optional(),
      actualStartTime: z.string().datetime().optional(),
      actualEndTime: z.string().datetime().optional(),
      concurrentViewers: z.string().optional(),
      activeLiveChatId: z.string().optional()
    })
    .optional()
})
