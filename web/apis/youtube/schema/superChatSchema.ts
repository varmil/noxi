import { z } from 'zod'
import { GroupStrings } from 'config/constants/Site'

export const schema = z.object({
  amountMicros: z.number().min(0),
  currency: z.string(),
  amountDisplayString: z.string(),
  tier: z.number().min(0),
  userComment: z.string(),

  author: z.object({
    channelId: z.string(),
    displayName: z.string(),
    profileImageUrl: z.string().url(),
    isChatSponsor: z.boolean()
  }),

  videoId: z.string(),
  group: z.enum(GroupStrings),
  createdAt: z.string().datetime()
})
export const responseSchema = z.object({
  list: z.array(schema)
})

export type SuperChatSchema = z.infer<typeof schema>
export type SuperChatsSchema = SuperChatSchema[]
