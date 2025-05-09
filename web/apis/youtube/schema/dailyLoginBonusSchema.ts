import { z } from 'zod'

export const schema = z.object({
  eligible: z.boolean(),
  ticketsAwarded: z.number().min(0),
  totalTickets: z.number().min(0)
})
export const listSchema = z.object({ list: z.array(schema) })

export type DailyLoginBonusSchema = z.infer<typeof schema>
export type DailyLoginBonusesSchema = DailyLoginBonusSchema[]
