import { z } from 'zod'

const schema = z.object({
  id: z.string(),
  statistics: z.object({
    viewCount: z.string().optional(),
    likeCount: z.string().optional(),
    commentCount: z.string().optional()
  })
})

export const responseSchema = z.array(schema)
export type StatisticsSchema = z.infer<typeof schema>
export type StatisticsListSchema = StatisticsSchema[]
