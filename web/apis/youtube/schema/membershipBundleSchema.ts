import { z } from 'zod'

const bigIntSchema = z.string().pipe(z.coerce.bigint())

export const schema = z.object({
  videoId: z.string(),
  channelId: z.string(),
  amountMicros: bigIntSchema,
  count: z.number().min(0),
  actualStartTime: z.coerce.date(),
  actualEndTime: z.coerce.date().optional(),
  group: z.string()
})
export const listSchema = z.object({
  list: z.array(schema)
})

export type MembershipBundleSchema = z.infer<typeof schema>
export type MembershipBundlesSchema = MembershipBundleSchema[]
