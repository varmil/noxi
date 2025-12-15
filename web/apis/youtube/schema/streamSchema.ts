import { z } from 'zod'

export const responseSchema = z.object({
  videoId: z.string(),

  snippet: z.object({
    publishedAt: z.string().datetime(),
    channelId: z.string(),
    title: z.string(),
    thumbnails: z.record(
      z.enum(['default', 'medium', 'high', 'standard', 'maxres']),
      z.object({
        url: z.string(),
        width: z.number().optional(),
        height: z.number().optional()
      })
    )
  }),

  duration: z.string().duration().optional(),

  streamTimes: z.object({
    scheduledStartTime: z.string().datetime().optional(),
    actualStartTime: z.string().datetime().optional(),
    actualEndTime: z.string().datetime().optional()
  }),

  metrics: z.object({
    peakConcurrentViewers: z.number().min(0),
    avgConcurrentViewers: z.number().min(0),
    chatMessages: z.number().min(0),
    views: z.number().min(0).optional(),
    likes: z.number().min(0)
  }),

  group: z.string(),
  updatedAt: z.coerce.date(),

  // using union() because it can be one of "scheduled", "live" or "ended"
  status: z.union([
    z.literal('scheduled'),
    z.literal('live'),
    z.literal('ended')
  ]),

  membersOnly: z.boolean()
})
export const responseListSchema = z.object({
  list: z.array(responseSchema)
})

export type StreamSchema = z.infer<typeof responseSchema>
export type StreamsSchema = StreamSchema[]
