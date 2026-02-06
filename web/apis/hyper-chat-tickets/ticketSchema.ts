import { z } from 'zod'

export const SOURCE_TYPES = ['release', 'signup', 'loginBonus'] as const
export type SourceType = (typeof SOURCE_TYPES)[number]

export const ticketSchema = z.object({
  id: z.number(),
  userId: z.number(),
  expiresAt: z.string(), // ISO 8601 string (Date cannot be serialized to Client Components)
  usedAt: z.string().nullable(),
  sourceType: z.enum(SOURCE_TYPES),
  createdAt: z.string()
})

export const ticketsResponseSchema = z.object({
  list: z.array(ticketSchema)
})

export const progressResponseSchema = z.object({
  granted: z.boolean(),
  currentCount: z.number()
})

export type TicketSchema = z.infer<typeof ticketSchema>
export type TicketsSchema = TicketSchema[]
export type ProgressResponseSchema = z.infer<typeof progressResponseSchema>
