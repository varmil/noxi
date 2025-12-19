import { z } from 'zod'

export const schema = z.object({
  date: z.string(),
  medianViewers: z.number().min(0)
})

export const responseSchema = z.object({
  data: z.array(schema)
})

export type ConcurrentViewerTrendSchema = z.infer<typeof schema>
export type ConcurrentViewerTrendsSchema = ConcurrentViewerTrendSchema[]
