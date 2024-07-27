import { z } from 'zod'
import { converter } from '@infra/lib/converter'
import { firestoreFieldValueOrTimestampSchema } from '@infra/schema/TimeStampSchema'

const aggregation = z.object({
  averageViews: z.number(),
  frequency: z.number(),
  averageEngagementCount: z.number(),
  averageEngagementRate: z.string()
})

export const videoAggregationSchema = z.object({
  channelId: z.string(),
  regular: aggregation,
  short: aggregation,
  live: aggregation,

  updatedAt: firestoreFieldValueOrTimestampSchema
})

export type VideoAggregationSchema = z.infer<typeof videoAggregationSchema>
export const videoAggregationConverter = converter(videoAggregationSchema)
