import { z } from 'zod'

export const schema = z.object({
  count: z.number().min(0),
  createdAt: z.coerce.date()
})
export const responseSchema = z.object({ list: z.array(schema) })

export type ViewerCountSchema = z.infer<typeof schema>
export type ViewerCountsSchema = ViewerCountSchema[]
