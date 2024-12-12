import { z } from 'zod'
import { GroupStrings } from 'config/constants/Site'

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
export const responseSchema = z.object({
  list: z.array(schema)
})

export type SupersBundleSchema = z.infer<typeof schema>
export type SupersBundlesSchema = SupersBundleSchema[]

// =======================================
// =======================================

/** GET /api/super-bundles/sum */
export const sumSchema = z.object({
  channelId: z.string(),
  amountMicros: bigIntSchema
})
export type SupersBundleSumSchema = z.infer<typeof sumSchema>
