import { z } from 'zod'

export const schema = z.object({
  val: z.string()
})
export const responseSchema = z.object({ list: z.array(schema) })

export type GroupSchema = z.infer<typeof schema>
export type GroupsSchema = GroupSchema[]
