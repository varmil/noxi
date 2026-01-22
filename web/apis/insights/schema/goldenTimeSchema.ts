import { z } from 'zod'

export const schema = z.object({
  hour: z.number().min(0).max(23),
  dayOfWeek: z.number().min(0).max(6),
  streamCount: z.number().min(0)
})

export const responseSchema = z.object({
  list: z.array(schema)
})

export type GoldenTimeSchema = z.infer<typeof schema>
export type GoldenTimesSchema = GoldenTimeSchema[]
