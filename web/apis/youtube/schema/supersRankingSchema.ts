import { z } from 'zod'

export const schema = z.object({
  rank: z.number().min(0),
  createdAt: z.coerce.date()
})

export type SupersRankingSchema = z.infer<typeof schema>

// =======================================
// =======================================

/** GET /api/super-rankings/histories */
export const responseHistoriesSchema = z.object({
  list: z.array(schema)
})
export type SupersRankingHistoriesSchema = SupersRankingSchema[]
