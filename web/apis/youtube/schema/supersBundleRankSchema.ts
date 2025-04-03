import { z } from 'zod'

export const schema = z.object({
  videoId: z.string(),
  rank: z.number().min(1),
  topPercentage: z.number().min(0).max(100)
})
export const listSchema = z.object({
  list: z.array(schema)
})

export type SupersBundleRankSchema = z.infer<typeof schema>
export type SupersBundleRanksSchema = SupersBundleRankSchema[]
