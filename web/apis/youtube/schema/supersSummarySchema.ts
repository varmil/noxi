import { z } from 'zod'

const schema1 = z.object({
  channelId: z.string(),
  last24Hours: z.coerce.bigint()
})

const schema2 = z.object({
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

const schema = z.union([schema1, schema2])

export const responseSchema = z.object({
  list: z.array(schema)
  // list: z.union([z.array(schema1), z.array(schema2)])
})

export type SupersSummarySchema = z.infer<typeof schema>
export type SupersSummariesSchema = SupersSummarySchema[]
