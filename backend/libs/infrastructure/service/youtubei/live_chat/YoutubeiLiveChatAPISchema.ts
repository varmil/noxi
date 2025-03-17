import { z } from 'zod'

export const authorNameSchema = z
  .object({
    simpleText: z.string()
  })
  .optional()

export const authorPhotoSchema = z.object({
  thumbnails: z.array(z.object({ url: z.string() }))
})

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
  timestampUsec: z.string(),
  authorExternalChannelId: z.string(),
  authorName: authorNameSchema,
  authorPhoto: authorPhotoSchema,
  message: textMessageSchema,
  authorBadges: authorBadgesSchema
})

const paidRenderer = textRenderer.merge(
  z.object({
    purchaseAmountText: z.object({
      simpleText: z.string()
    })
  })
)

// authorBadges[0].liveChatAuthorBadgeRenderer.tooltipに
// "メンバー（3 年）" のような文字列が含まれる
const membershipRenderer = textRenderer

const membershipGiftRenderer = z.object({
  id: z.string(),
  timestampUsec: z.string(),
  authorExternalChannelId: z.string(),
  header: z.object({
    liveChatSponsorshipsHeaderRenderer: z.object({
      authorName: authorNameSchema,
      authorPhoto: authorPhotoSchema,
      // primaryText.runs[0].text に "10" のようなギフト数が含まれる
      primaryText: textMessageSchema,
      authorBadges: authorBadgesSchema
    })
  })
})

export const addChatItemActionItemSchema = z.object({
  // 通常のメッセージ
  liveChatTextMessageRenderer: textRenderer.optional(),
  // スーパーチャット
  liveChatPaidMessageRenderer: paidRenderer.optional(),
  // スーパーステッカー
  liveChatPaidStickerRenderer: paidRenderer.optional(),
  // メンバー加入
  liveChatMembershipItemRenderer: membershipRenderer.optional(),
  // メンバーシップギフト
  liveChatSponsorshipsGiftPurchaseAnnouncementRenderer:
    membershipGiftRenderer.optional()
})

const continuationData = z.object({ continuation: z.string() }).optional()
export const youtubeiLiveChatAPISchema = z.object({
  responseContext: z.object({
    serviceTrackingParams: z.array(
      z.object({
        service: z.string(),
        params: z.array(
          z.object({ key: z.string(), value: z.string().optional() })
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
            reloadContinuationData: continuationData,
            liveChatReplayContinuationData: continuationData
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
