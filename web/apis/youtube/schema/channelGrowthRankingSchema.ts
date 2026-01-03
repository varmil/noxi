import { z } from 'zod'

export const schema = z.object({
  rank: z.number().min(1),
  channelId: z.string(),
  channelTitle: z.string(),
  thumbnailUrl: z.string().nullable(),
  groupName: z.string(),
  diff: z.number(),
  rate: z.number(),
  subscriberCount: z.number()
})

export const responseSchema = z.object({
  list: z.array(schema)
})

export type ChannelGrowthRankingSchema = z.infer<typeof schema>
export type ChannelGrowthRankingsSchema = ChannelGrowthRankingSchema[]
