import { z } from 'zod'

export const schema = z.object({
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
    publishedAt: z.string().datetime(),
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

  updatedAt: z.string().datetime().optional()
})
export const responseSchema = z.object({ list: z.array(schema) })

export type ChannelSchema = z.infer<typeof schema>
export type ChannelsSchema = ChannelSchema[]
