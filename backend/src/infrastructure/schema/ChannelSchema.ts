import { z } from 'zod'
import { converter } from '@infra/lib/converter'
import {
  firestoreFieldValueOrTimestampSchema,
  firestoreTimestampSchema
} from '@infra/schema/TimeStampSchema'
import { videoAggregationSchema } from '@infra/schema/VideoAggregationSchema'

export const channelSchema = z.object({
  basicInfo: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnails: z.record(
      z.enum(['default', 'medium', 'high']),
      z.object({
        url: z.string().optional().nullable(),
        width: z.number().optional().nullable(),
        height: z.number().optional().nullable()
      })
    ),
    publishedAt: firestoreTimestampSchema,
    defaultLanguage: z.string().optional()
  }),
  contentDetails: z.object({
    relatedPlaylists: z.object({ uploads: z.string() })
  }),
  statistics: z.object({
    viewCount: z.number().min(0),
    subscriberCount: z.number().min(0),
    videoCount: z.number().min(0)
  }),
  brandingSettings: z.object({
    keywords: z.array(z.string()),
    country: z.string()
  }),

  // from VideoAggregation
  latestVideoAggregation: videoAggregationSchema
    .omit({ channelId: true })
    .optional(),

  updatedAt: firestoreFieldValueOrTimestampSchema,
  expireAt: firestoreFieldValueOrTimestampSchema
})

export type ChannelSchema = z.infer<typeof channelSchema>
export const channelConverter = converter(channelSchema)
