import { z } from 'zod'

const bigIntSchema = z.string().pipe(z.coerce.bigint())

const schema1 = z.object({
  channelId: z.string(),
  last24Hours: bigIntSchema
})

const schema2 = z.object({
  channelId: z.string(),
  last7Days: bigIntSchema,
  last30Days: bigIntSchema,
  last90Days: bigIntSchema,
  last1Year: bigIntSchema,
  thisWeek: bigIntSchema,
  thisMonth: bigIntSchema,
  thisYear: bigIntSchema,
  createdAt: z.coerce.date()
})

const schema = z.union([schema1, schema2])

export const responseSchema = z.object({
  list: z.union([z.array(schema1), z.array(schema2)])
})

export type SupersSummarySchema = z.infer<typeof schema>
export type SupersSummariesSchema = SupersSummarySchema[]
