import { z } from 'zod'

export const responseSchema = z
  .object({
    rank: z.number().min(0),
    createdAt: z.coerce.date()
  })
  .optional()

export type SupersRankingSchema = z.infer<typeof responseSchema>

// =======================================
// =======================================

/** GET /api/super-rankings/histories */
export const responseHistoriesSchema = z.object({
  list: z.array(responseSchema)
})
export type SupersRankingHistoriesSchema = SupersRankingSchema[]
