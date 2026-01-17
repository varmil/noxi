import { z } from 'zod'

export const inactiveChannelSchema = z.object({
  id: z.string(),
  title: z.string(),
  group: z.string(),
  subscriberCount: z.number(),
  thumbnailUrl: z.string().nullable(),
  lastStreamDate: z.string().nullable()
})

export type InactiveChannelSchema = z.infer<typeof inactiveChannelSchema>

export const inactiveChannelsResponseSchema = z.object({
  list: z.array(inactiveChannelSchema)
})

export type InactiveChannelsSchema = InactiveChannelSchema[]
