import { z } from 'zod'

export const authorBadgesSchema = z
  .array(
    z.object({
      liveChatAuthorBadgeRenderer: z.object({ tooltip: z.string() })
    })
  )
  .optional()

export const textMessageSchema = z
  .object({
    runs: z.array(
      z.object({
        text: z.string().optional(),
        emoji: z
          .object({
            emojiId: z.string().optional(),
            isCustomEmoji: z.boolean().optional(),
            shortcuts: z.array(z.string()).optional()
          })
          .optional()
      })
    )
  })
  .optional()

const textRenderer = z.object({
  id: z.string(),
  authorName: z.object({ simpleText: z.string() }).optional(),
  authorPhoto: z.object({
    thumbnails: z.array(z.object({ url: z.string() }))
  }),
  authorExternalChannelId: z.string(),
  message: textMessageSchema,
  timestampUsec: z.string(),
  authorBadges: authorBadgesSchema
})

const paidRenderer = textRenderer.merge(
  z.object({
    purchaseAmountText: z.object({
      simpleText: z.string()
    })
  })
)

export const addChatItemActionItemSchema = z.object({
  // 通常のメッセージ
  liveChatTextMessageRenderer: textRenderer.optional(),
  // スーパーチャット
  liveChatPaidMessageRenderer: paidRenderer.optional(),
  // スーパーステッカー
  liveChatPaidStickerRenderer: paidRenderer.optional()
})

const continuationData = z
  .object({
    continuation: z.string(),
    timeoutMs: z.number()
  })
  .optional()

export const youtubeiLiveChatAPISchema = z.object({
  responseContext: z.object({
    serviceTrackingParams: z.array(
      z.object({
        service: z.string(),
        params: z.array(
          z.object({
            key: z.string(),
            value: z.string().optional()
          })
        )
      })
    )
  }),
  continuationContents: z
    .object({
      liveChatContinuation: z.object({
        continuations: z.array(
          z.object({
            timedContinuationData: continuationData,
            invalidationContinuationData: continuationData,
            reload_continuation_data: continuationData,
            live_chat_replay_continuation_data: continuationData
          })
        ),
        actions: z
          .array(
            z.object({
              addChatItemAction: z
                .object({
                  item: addChatItemActionItemSchema
                })
                .optional()
            })
          )
          .optional()
      })
    })
    .optional()
})
