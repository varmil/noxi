import { z } from 'zod'

const schema = z.object({
  id: z.string(),

  snippet: z.object({
    publishedAt: z.string().datetime(),
    channelId: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnails: z.record(
      z.enum(['default', 'medium', 'high', 'standard', 'maxres']),
      z.object({
        url: z.string(),
        width: z.number().optional(),
        height: z.number().optional()
      })
    ),
    categoryId: z.number()
  }),
  statistics: z.object({
    viewCount: z.number().min(0).optional(),
    likeCount: z.number().min(0),
    commentCount: z.number().min(0)
  }),
  liveStreamingDetails: z
    .object({
      streamTimes: z.object({
        scheduledStartTime: z.string().datetime().optional(),
        actualStartTime: z.string().datetime().optional(),
        actualEndTime: z.string().datetime().optional()
      }),
      concurrentViewers: z.number().optional()
    })
    .optional(),

  membersOnly: z.boolean(),
  isShort: z.boolean(),
  isPaidPromotion: z.boolean().optional(),

  updatedAt: z.string().datetime().optional()
})

export const responseSchema = z.object({
  items: z.object({ list: z.array(schema) }),
  nextPageToken: z.string().optional(),
  prevPageToken: z.string().optional()
})

export type VideoSchema = z.infer<typeof schema>
export type VideosSchema = VideoSchema[]
