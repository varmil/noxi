import { z } from 'zod'

const pointSchema = z.object({
  date: z.string(),
  total: z.number(),
  diff: z.number()
})

export const responseSchema = z.array(pointSchema)

export type AggregatedSubscriberCountSchema = z.infer<typeof responseSchema>
