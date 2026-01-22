import { z } from 'zod'

export const schema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  streamCount: z.number().min(0),
  medianViewers: z.number().min(0)
})

export const responseSchema = z.object({
  list: z.array(schema)
})

export type DayOfWeekDistributionSchema = z.infer<typeof schema>
export type DayOfWeekDistributionsSchema = DayOfWeekDistributionSchema[]
