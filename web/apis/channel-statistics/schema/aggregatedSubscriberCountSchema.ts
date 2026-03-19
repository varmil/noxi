import { z } from 'zod'

const pointSchema = z.object({
  date: z.string(),
  total: z.number(),
  diff: z.number()
})

export const responseSchema = z.object({
  list: z.array(pointSchema)
})

export type AggregatedSubscriberCountPoint = z.infer<typeof pointSchema>
export type AggregatedSubscriberCountSchema = AggregatedSubscriberCountPoint[]
