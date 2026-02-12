import { z } from 'zod'

export const contributorSchema = z.object({
  userId: z.number(),
  point: z.number(),
  name: z.string().nullable(),
  image: z.string().nullable(),
  username: z.string().nullable()
})

export const hyperTrainSchema = z.object({
  id: z.number(),
  channelId: z.string(),
  group: z.string(),
  level: z.number(),
  totalPoint: z.number(),
  startedAt: z.string(),
  expiresAt: z.string(),
  contributors: z.array(contributorSchema)
})

export const hyperTrainsResponseSchema = z.object({
  list: z.array(hyperTrainSchema)
})

export type HyperTrainSchema = z.infer<typeof hyperTrainSchema>
export type HyperTrainContributorSchema = z.infer<typeof contributorSchema>
