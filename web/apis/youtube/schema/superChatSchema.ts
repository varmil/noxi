import { z } from 'zod'

export const schema = z.object({
  id: z.string(),
  amountMicros: z.number().min(0),
  currency: z.string(),
  amountDisplayString: z.string(),
  tier: z.number().min(0),
  userComment: z.string(),

  author: z.object({
    displayName: z.string(),
    profileImageUrl: z.string().url(),
    isChatSponsor: z.boolean()
  }),

  createdAt: z.coerce.date()
})
export const responseSchema = z.object({
  list: z.array(schema)
})

export type SuperChatSchema = z.infer<typeof schema>
export type SuperChatsSchema = SuperChatSchema[]
