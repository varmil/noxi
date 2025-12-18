import { z } from 'zod'

export const schema = z.object({
  date: z.string(),
  streamCount: z.number().min(0),
  totalDurationHours: z.number().min(0)
})

export const responseSchema = z.object({
  data: z.array(schema)
})

export type StreamVolumeTrendSchema = z.infer<typeof schema>
export type StreamVolumeTrendsSchema = StreamVolumeTrendSchema[]
