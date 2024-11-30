import { z } from 'zod'

export const schema = z.object({
  channelId: z.string(),
  last7Days: z.coerce.bigint(),
  last30Days: z.coerce.bigint(),
  last90Days: z.coerce.bigint(),
  last1Year: z.coerce.bigint(),
  thisWeek: z.coerce.bigint(),
  thisMonth: z.coerce.bigint(),
  thisYear: z.coerce.bigint(),
  createdAt: z.coerce.date()
})
export const responseSchema = z.object({
  list: z.array(schema)
})

export type SupersSummarySchema = z.infer<typeof schema>
export type SupersSummariesSchema = SupersSummarySchema[]
