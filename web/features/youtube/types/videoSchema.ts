import { z } from 'zod'

export const videoSchema = z.object({
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

  updatedAt: z.string().datetime()
})

export type VideoSchema = z.infer<typeof videoSchema>
export type VideosSchema = VideoSchema[]
