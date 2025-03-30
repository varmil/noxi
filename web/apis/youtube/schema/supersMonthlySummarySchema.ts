import { z } from 'zod'

const bigIntSchema = z.string().pipe(z.coerce.bigint())

export const schema = z.object({
  channelId: z.string(),
  thisMonth: bigIntSchema,
  createdAt: z.coerce.date()
})
export const listSchema = z.object({ list: z.array(schema) })

export type SupersMonthlySummarySchema = z.infer<typeof schema>
export type SupersMonthlySummariesSchema = SupersMonthlySummarySchema[]
