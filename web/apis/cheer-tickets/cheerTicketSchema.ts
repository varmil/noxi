import { z } from 'zod'

export const schema = z.object({
  userId: z.number(),
  totalCount: z.number(),
  lastClaimedAt: z.coerce.date()
})
export const responseListSchema = z.object({
  list: z.array(schema)
})
export type CheerTicketSchema = z.infer<typeof schema>
export type CheerTicketsSchema = CheerTicketSchema[]
