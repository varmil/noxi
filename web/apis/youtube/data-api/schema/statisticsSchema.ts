import { z } from 'zod'

const statisticsSchema = z.object({
  viewCount: z.coerce.number().optional(),
  likeCount: z.coerce.number().optional(),
  commentCount: z.coerce.number().optional()
})

const response = z.object({
  id: z.string(),
  statistics: z.object({
    viewCount: z.coerce.number().optional(),
    likeCount: z.coerce.number().optional(),
    commentCount: z.coerce.number().optional()
  })
})

export const responseSchema = z.array(response)
export type StatisticsSchema = z.infer<typeof statisticsSchema>
export type StatisticsListSchema = z.infer<typeof response>[]
