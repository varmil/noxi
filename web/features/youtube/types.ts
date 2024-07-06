import { z } from 'zod'

const channelSchema = z.object({
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
    publishedAt: z.string()
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
      keywords: z.array(z.string()),
      country: z.string()
    })
    .optional(),

  // from VideoAggregation
  latestVideoAggregation: z
    .object({
      averageViews: z.number(),
      uploadFrequency: z.number(),
      liveFrequency: z.number(),
      averageEngagementRate: z.number().min(0).max(100),
      updatedAt: z.string()
    })
    .optional(),

  updatedAt: z.string()
})

export type ChannelSchema = z.infer<typeof channelSchema>
export type ChannelsSchema = ChannelSchema[]
