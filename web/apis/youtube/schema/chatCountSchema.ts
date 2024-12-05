import { z } from 'zod'

export const schema = z.object({
  all: z.number().min(0),
  member: z.number().min(0),
  createdAt: z.coerce.date()
})
export const responseSchema = z.object({ list: z.array(schema) })

export type ChatCountSchema = z.infer<typeof schema>
export type ChatCountsSchema = ChatCountSchema[]
