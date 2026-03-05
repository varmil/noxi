import { z } from 'zod'

export const schema = z.object({
  rank: z.number().min(1),
  channelId: z.string(),
  channelTitle: z.string(),
  thumbnailUrl: z.string().nullable(),
  groupId: z.string(),
  groupName: z.string(),
  diff: z.number(),
  viewCount: z.coerce.number()
})

export const responseSchema = z.object({
  list: z.array(schema)
})

export type ChannelViewCountRankingSchema = z.infer<typeof schema>
export type ChannelViewCountRankingsSchema = ChannelViewCountRankingSchema[]
