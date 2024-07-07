import { z } from 'zod'

const aggregation = z.object({
  averageViews: z.number(),
  frequency: z.number(),
  averageEngagementCount: z.number(),
  averageEngagementRate: z.string()
})

export const videoAggregationSchema = z.object({
  regular: aggregation,
  short: aggregation,
  live: aggregation,

  updatedAt: z.string().datetime()
})

export type VideoAggregationSchema = z.infer<typeof videoAggregationSchema>
