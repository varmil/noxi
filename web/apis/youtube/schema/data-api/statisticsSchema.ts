import { z } from 'zod'

const schema = z.object({
  id: z.string(),
  statistics: z.object({
    viewCount: z.number().min(0),
    likeCount: z.number().min(0),
    commentCount: z.number().min(0)
  })
})

export const responseSchema = z.array(schema)
export type StatisticsSchema = z.infer<typeof schema>
export type StatisticsListSchema = StatisticsSchema[]
