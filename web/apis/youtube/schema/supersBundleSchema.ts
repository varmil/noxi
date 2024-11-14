import { z } from 'zod'
import { GroupStrings } from 'config/constants/Site'

export const schema = z.object({
  videoId: z.string(),
  channelId: z.string(),
  amountMicros: z.coerce.bigint(),
  count: z.number().min(0),
  actualStartTime: z.coerce.date(),
  actualEndTime: z.coerce.date(),
  group: z.enum(GroupStrings)
})
export const responseSchema = z.object({
  list: z.array(schema)
})

export type SupersBundleSchema = z.infer<typeof schema>
export type SupersBundlesSchema = SupersBundleSchema[]
