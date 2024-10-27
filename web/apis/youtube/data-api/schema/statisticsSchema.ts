import { z } from 'zod'

const schema = z.object({
  id: z.string(),
  statistics: z.object({
    viewCount: z.coerce.number().optional(),
    likeCount: z.coerce.number().optional(),
    commentCount: z.coerce.number().optional()
  })
})

export const responseSchema = z.array(schema)
export type StatisticsSchema = z.infer<typeof schema>
export type StatisticsListSchema = StatisticsSchema[]
