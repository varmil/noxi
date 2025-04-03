import { z } from 'zod'
import { GroupStrings } from 'config/constants/Group'

const bigIntSchema = z.string().pipe(z.coerce.bigint())

export const schema = z.object({
  videoId: z.string(),
  channelId: z.string(),
  amountMicros: bigIntSchema,
  count: z.number().min(0),
  actualStartTime: z.coerce.date(),
  actualEndTime: z.coerce.date().optional(),
  group: z.enum(GroupStrings)
})
export const listSchema = z.object({
  list: z.array(schema)
})

export type MembershipBundleSchema = z.infer<typeof schema>
export type MembershipBundlesSchema = MembershipBundleSchema[]
