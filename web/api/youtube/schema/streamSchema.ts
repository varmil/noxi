import { z } from 'zod'

const schema = z.object({
  videoId: z.string(),

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
    categoryId: z.number()
  }),

  duration: z.string().duration(),

  streamTimes: z.object({
    scheduledStartTime: z.string().datetime(),
    actualStartTime: z.string().datetime().optional(),
    actualEndTime: z.string().datetime().optional()
  }),

  maxViewerCount: z.number(),
  likeCount: z.number().min(0)
})
export const responseSchema = z.object({
  list: z.array(schema)
})

export type StreamSchema = z.infer<typeof schema>
export type StreamsSchema = StreamSchema[]
