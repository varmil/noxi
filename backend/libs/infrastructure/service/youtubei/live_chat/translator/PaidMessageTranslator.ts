import { z } from 'zod'
import { AmountDisplayString, UserComment } from '@domain/supers'
import { PublishedAt } from '@domain/youtube'
import {
  LiveChatMessage,
  LiveChatMessageId,
  Snippet,
  SuperChatDetails,
  Type
} from '@domain/youtube/live-chat-message'
import { PurchaseAmountText } from '@domain/youtubei/live-chat/PurchaseAmountText.vo'
import {
  addChatItemActionItemSchema,
  textMessageSchema
} from '@infra/service/youtubei/live_chat'
import { BaseTranslator } from './BaseTranslator'
import { IMessageTranslator } from './IMessageTranslator'

export class PaidMessageTranslator
  extends BaseTranslator
  implements IMessageTranslator
{
  constructor(
    private readonly renderer: z.infer<
      typeof addChatItemActionItemSchema
    >['liveChatPaidMessageRenderer']
  ) {
    super()
  }

  translate(): LiveChatMessage | undefined {
    if (!this.renderer) return undefined

    const { message, purchaseAmountText } = this.renderer

    const { symbol, amountMicros } = new PurchaseAmountText(
      purchaseAmountText.simpleText
    ).parse()

    const superChatDetails = new SuperChatDetails({
      amountMicros,
      currency: symbol.ToCurrency(),
      amountDisplayString: new AmountDisplayString(
        purchaseAmountText.simpleText
      ),
      userComment: new UserComment(this.concatMessage(message))
    })

    const {
      id,
      authorName,
      authorPhoto,
      authorExternalChannelId,
      timestampUsec,
      authorBadges
    } = this.renderer

    const type = new Type('superChatEvent')

    return new LiveChatMessage({
      id: new LiveChatMessageId(id),
      snippet: new Snippet({
        type: type,
        publishedAt: new PublishedAt(new Date(Number(timestampUsec) / 1000)),
        superChatDetails,
        superStickerDetails: undefined
      }),
      authorDetails: this.createAuthorDetails(
        authorExternalChannelId,
        authorName,
        authorPhoto,
        authorBadges
      )
    })
  }

  private concatMessage(message: z.infer<typeof textMessageSchema>): string {
    if (!message) return ''

    return message.runs.reduce((acc, run) => {
      if (run.text) {
        return acc + run.text
      } else if (run.emoji) {
        if (run.emoji.isCustomEmoji) {
          return (
            acc + (run.emoji.shortcuts?.[run.emoji.shortcuts.length - 1] ?? '')
          )
        } else {
          return acc + run.emoji.emojiId
        }
      }
      return acc
    }, '')
  }
}
