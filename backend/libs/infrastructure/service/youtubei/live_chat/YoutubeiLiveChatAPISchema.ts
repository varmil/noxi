import { z } from 'zod'

export const authorBadgesSchema = z
  .array(
    z.object({
      liveChatAuthorBadgeRenderer: z.object({ tooltip: z.string() })
    })
  )
  .optional()

const textRenderer = z.object({
  id: z.string(),
  authorName: z.object({ simpleText: z.string() }).optional(),
  authorPhoto: z.object({
    thumbnails: z.array(z.object({ url: z.string() }))
  }),
  authorExternalChannelId: z.string(),
  message: z
    .object({
      runs: z.array(z.object({ text: z.string().optional() }))
    })
    .optional(),
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
  liveChatTextMessageRenderer: textRenderer.optional(),
  liveChatPaidMessageRenderer: paidRenderer.optional()
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
