import { z } from 'zod'

export const liveChatMessagesAPISchema = z.object({
  id: z.string(),

  snippet: z.object({
    type: z.string(),

    publishedAt: z.string().datetime({ offset: true }),

    superChatDetails: z
      .object({
        amountMicros: z.string(),
        currency: z.string(),
        amountDisplayString: z.string(),
        tier: z.number(),
        userComment: z.string().optional()
      })
      .optional(),

    superStickerDetails: z
      .object({
        superStickerMetadata: z.object({
          stickerId: z.string()
        }),
        amountMicros: z.string(),
        currency: z.string(),
        amountDisplayString: z.string(),
        tier: z.number()
      })
      .optional()
  }),

  authorDetails: z.object({
    channelId: z.string(),
    channelUrl: z.string(),
    displayName: z.string(),
    profileImageUrl: z.string(),
    isVerified: z.boolean(),
    isChatOwner: z.boolean(),
    isChatSponsor: z.boolean(),
    isChatModerator: z.boolean()
  })
})
