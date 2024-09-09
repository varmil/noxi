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

  peakConcurrentViewers: z.number().min(0),
  avgConcurrentViewers: z.number().min(0),
  chatMessages: z.number().min(0),
  views: z.number().min(0),
  likes: z.number().min(0),

  // using union() because it can be one of "scheduled", "live" or "ended"
  status: z.union([
    z.literal('scheduled'),
    z.literal('live'),
    z.literal('ended')
  ])
})
export const responseSchema = z.object({
  list: z.array(schema)
})

export type StreamSchema = z.infer<typeof schema>
export type StreamsSchema = StreamSchema[]
