import { z } from 'zod'
import { converter } from '@infra/lib/converter'
import {
  firestoreFieldValueOrTimestampSchema,
  firestoreTimestampSchema
} from '@infra/schema/TimeStampSchema'
import { videoAggregationSchema } from '@infra/schema/VideoAggregationSchema'

export const channelSchema = z.object({
  // from /v3/search
  basicInfo: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnails: z.record(
      z.enum(['default', 'medium', 'high']),
      z.object({
        url: z.string(),
        width: z.number().optional(),
        height: z.number().optional()
      })
    ),
    publishedAt: firestoreTimestampSchema
  }),

  // from /v3/channels
  statistics: z
    .object({
      viewCount: z.number().min(0),
      subscriberCount: z.number().min(0),
      videoCount: z.number().min(0)
    })
    .optional(),
  brandingSettings: z
    .object({
      keywords: z.array(z.string()),
      country: z.string()
    })
    .optional(),

  // from VideoAggregation
  latestVideoAggregation: videoAggregationSchema.optional(),

  updatedAt: firestoreFieldValueOrTimestampSchema
})

export type ChannelSchema = z.infer<typeof channelSchema>
export const channelConverter = converter(channelSchema)
