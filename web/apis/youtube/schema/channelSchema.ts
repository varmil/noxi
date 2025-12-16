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
    publishedAt: z.string().datetime()
  }),
  statistics: z.object({
    viewCount: z.coerce.bigint(),
    subscriberCount: z.number().min(0),
    videoCount: z.number().min(0)
  }),
  peakX: z.object({
    group: z.string(),
    country: z.string(),
    defaultLanguage: z.string().optional(),
    gender: z.enum(['male', 'female', 'nonbinary'])
  }),

  updatedAt: z.string().datetime().optional()
})
export const responseSchema = z.object({ list: z.array(schema) })

export type ChannelSchema = z.infer<typeof schema>
export type ChannelsSchema = ChannelSchema[]
