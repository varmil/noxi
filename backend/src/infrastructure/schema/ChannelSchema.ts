import { z } from 'zod'
import { converter } from '@infra/lib/converter'
import {
  firestoreFieldValueOrTimestampSchema,
  firestoreTimestampSchema
} from '@infra/schema/TimeStampSchema'

export const channelSchema = z.object({
  // from /v3/search
  basicInfo: z.object({
    id: z.string(),
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
    publishedAt: firestoreTimestampSchema
  }),

  // from /v3/channels
  statistics: z
    .object({
      viewCount: z.string(),
      subscriberCount: z.string(),
      videoCount: z.string()
    })
    .optional(),
  brandingSettings: z
    .object({
      channel: z.object({
        keywords: z.array(z.string()),
        country: z.string()
      })
    })
    .optional(),

  // from VideoAggregation
  latestVideoAggregation: z
    .object({
      averageViews: z.number(),
      uploadFrequency: z.number(),
      liveFrequency: z.number(),
      averageEngagementRate: z.number().min(0).max(100),
      updatedAt: firestoreFieldValueOrTimestampSchema
    })
    .optional(),

  updatedAt: firestoreFieldValueOrTimestampSchema
})

export type ChannelSchema = z.infer<typeof channelSchema>
export const channelConverter = converter(channelSchema)
