import { z } from 'zod'
import { GroupStrings } from 'config/constants/Group'

export const schema = z.object({
  val: z.enum(GroupStrings)
})
export const responseSchema = z.object({ list: z.array(schema) })

export type GroupSchema = z.infer<typeof schema>
export type GroupsSchema = GroupSchema[]
