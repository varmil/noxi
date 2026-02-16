import { z } from 'zod'

export const TIERS = ['free', 'lite', 'standard', 'premium', 'special'] as const
export type TierValue = (typeof TIERS)[number]

export const PAID_TIERS = ['lite', 'standard', 'premium', 'special'] as const
export type PaidTierValue = (typeof PAID_TIERS)[number]

export const TIER_CONFIG = {
  free: { price: 0, maxChars: 60 },
  lite: { price: 300, maxChars: 60 },
  standard: { price: 1000, maxChars: 140 },
  premium: { price: 3000, maxChars: 200 },
  special: { price: 10000, maxChars: 300 }
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
  createdAt: z.coerce.date(),
  author: z.object({
    name: z.string().nullable(),
    image: z.string().nullable(),
    username: z.string().nullable()
  })
})

export const responseSchema = z.object({
  list: z.array(schema)
})

export type HyperChatSchema = z.infer<typeof schema>
export type HyperChatsSchema = HyperChatSchema[]
