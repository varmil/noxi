import { z } from 'zod'
import { converter } from '@infra/lib/converter'
import { firestoreFieldValueOrTimestampSchema } from '@infra/schema/TimeStampSchema'

export const videoAggregationSchema = z.object({
  averageViews: z.number(),
  uploadFrequency: z.number(),
  liveFrequency: z.number(),
  averageEngagementRate: z.number().min(0).max(100),
  updatedAt: firestoreFieldValueOrTimestampSchema
})

export type VideoAggregationSchema = z.infer<typeof videoAggregationSchema>
export const videoAggregationConverter = converter(videoAggregationSchema)
