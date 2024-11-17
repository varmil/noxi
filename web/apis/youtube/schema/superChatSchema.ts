import { z } from 'zod'

export const schema = z.object({
  id: z.string(),
  amountMicros: z.coerce.bigint(),
  currency: z.string(),
  amountDisplayString: z.string(),
  userComment: z.string(),

  author: z.object({
    displayName: z.string(),
    profileImageUrl: z.string().url(),
    isChatSponsor: z.boolean()
  }),

  videoId: z.string(),
  createdAt: z.coerce.date()
})
export const responseSchema = z.object({
  list: z.array(schema)
})

export type SuperChatSchema = z.infer<typeof schema>
export type SuperChatsSchema = SuperChatSchema[]
