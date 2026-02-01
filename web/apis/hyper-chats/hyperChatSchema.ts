import { z } from 'zod'

export const TIERS = ['lite', 'standard', 'max'] as const
export type TierValue = (typeof TIERS)[number]

export const TIER_CONFIG = {
  lite: { price: 300, maxChars: 60 },
  standard: { price: 1000, maxChars: 140 },
  max: { price: 10000, maxChars: 300 }
} as const

export const schema = z.object({
  id: z.number(),
  userId: z.number(),
  channelId: z.string(),
  group: z.string(),
  gender: z.string(),
  tier: z.enum(TIERS),
  amount: z.number(),
  message: z.string(),
  likeCount: z.number(),
  createdAt: z.string()
})

export const responseSchema = z.object({
  list: z.array(schema)
})

export const paymentIntentResponseSchema = z.object({
  clientSecret: z.string(),
  orderId: z.number()
})

export type HyperChatSchema = z.infer<typeof schema>
export type HyperChatsSchema = HyperChatSchema[]
export type PaymentIntentResponseSchema = z.infer<
  typeof paymentIntentResponseSchema
>
