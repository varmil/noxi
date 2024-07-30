import { z } from 'zod'

export const videoAPISchema = z.object({
  id: z.string(),

  snippet: z.object({
    publishedAt: z.string().datetime(),
    channelId: z.string(),
    title: z.string(),
    /**
     * ここが割とnullable/undefinedになる
     */
    description: z.string(),
    thumbnails: z.record(
      z.enum(['default', 'medium', 'high', 'standard', 'maxres']),
      z.object({
        url: z.string(),
        width: z.number().optional(),
        height: z.number().optional()
      })
    ),
    tags: z.array(z.string()).optional(),
    categoryId: z.string(),
    defaultLanguage: z.string().optional()
  }),

  contentDetails: z.object({
    duration: z.string().duration()
  }),

  statistics: z.object({
    viewCount: z.string().min(0),
    likeCount: z.string().min(0).optional(),
    commentCount: z.string().min(0).optional()
  }),

  liveStreamingDetails: z
    .object({
      actualStartTime: z.string().datetime().optional(),
      actualEndTime: z.string().datetime().optional(),
      concurrentViewers: z.string().optional()
    })
    .optional()
})
