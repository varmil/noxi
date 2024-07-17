import { z } from 'zod'

export const schema = z.object({
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
    tags: z.array(z.string()),
    categoryId: z.string()
  }),
  duration: z.string().duration(),
  statistics: z.object({
    viewCount: z.number().min(0),
    likeCount: z.number().min(0),
    commentCount: z.number().min(0)
  }),
  liveStreamingDetails: z
    .object({
      actualStartTime: z.string().datetime(),
      actualEndTime: z.string().datetime()
    })
    .optional(),

  isShort: z.boolean(),
  engagementCount: z.number().min(0),
  engagementRate: z.number().min(0),

  updatedAt: z.string().datetime().optional()
})
export const responseSchema = z.object({
  videos: z.object({ list: z.array(schema) }),
  nextPageToken: z.string().optional()
})

export type VideoSchema = z.infer<typeof schema>
export type VideosSchema = VideoSchema[]
