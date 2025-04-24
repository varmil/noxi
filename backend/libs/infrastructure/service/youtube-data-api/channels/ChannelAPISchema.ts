import { z } from 'zod'

export const channelAPISchema = z.object({
  id: z.string(),

  snippet: z.object({
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
    publishedAt: z.string().datetime(),
    defaultLanguage: z.string().optional()
  }),

  contentDetails: z.object({
    relatedPlaylists: z.object({ uploads: z.string() })
  }),

  statistics: z.object({
    viewCount: z.string().optional(),
    subscriberCount: z.string().optional(),
    videoCount: z.string().optional()
  }),

  brandingSettings: z.object({
    channel: z.object({
      keywords: z.string().optional(),
      country: z.string().optional()
    })
  })
})
