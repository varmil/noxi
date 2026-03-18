import { z } from 'zod'

const pointSchema = z.object({
  week: z.string(),
  rank: z.number().int().min(1),
  totalChannels: z.number().int().min(1),
  subscriberCount: z.number().int().min(0)
})

export const responseSchema = z.object({
  trend: z.enum(['upward', 'downward', 'stable']),
  points: z.array(pointSchema)
})

export type SubscriberRankPointSchema = z.infer<typeof pointSchema>
export type SubscriberRankTrendSchema = z.infer<typeof responseSchema>
