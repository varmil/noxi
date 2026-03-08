import { z } from 'zod'

export const schema = z.object({
  rank: z.number().min(1),
  channelId: z.string(),
  channelTitle: z.string(),
  thumbnailUrl: z.string().nullable(),
  groupId: z.string(),
  groupName: z.string(),
  currentAmount: z.coerce.number(),
  previousAmount: z.coerce.number()
})

export const responseSchema = z.object({
  list: z.array(schema)
})

export type ChannelSupersRankingSchema = z.infer<typeof schema>
export type ChannelSupersRankingsSchema = ChannelSupersRankingSchema[]
