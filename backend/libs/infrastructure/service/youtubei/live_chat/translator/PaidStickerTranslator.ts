import { z } from 'zod'
import { AmountDisplayString } from '@domain/supers'
import { PublishedAt } from '@domain/youtube'
import {
  LiveChatMessage,
  LiveChatMessageId,
  Snippet,
  SuperStickerDetails,
  Type
} from '@domain/youtube/live-chat-message'
import { PurchaseAmountText } from '@domain/youtubei/live-chat/PurchaseAmountText.vo'
import { addChatItemActionItemSchema } from '@infra/service/youtubei/live_chat'
import { BaseTranslator } from './BaseTranslator'
import { IMessageTranslator } from './IMessageTranslator'

export class PaidStickerTranslator
  extends BaseTranslator
  implements IMessageTranslator
{
  constructor(
    private readonly renderer: z.infer<
      typeof addChatItemActionItemSchema
    >['liveChatPaidStickerRenderer']
  ) {
    super()
  }

  translate(): LiveChatMessage | undefined {
    if (!this.renderer) return undefined

    const { purchaseAmountText } = this.renderer

    const { symbol, amountMicros } = new PurchaseAmountText(
      purchaseAmountText.simpleText
    ).parse()

    const superStickerDetails = new SuperStickerDetails({
      amountMicros,
      currency: symbol.ToCurrency(),
      amountDisplayString: new AmountDisplayString(
        purchaseAmountText.simpleText
      )
    })

    const {
      id,
      authorName,
      authorPhoto,
      authorExternalChannelId,
      timestampUsec,
      authorBadges
    } = this.renderer

    const type = new Type('superStickerEvent')

    return new LiveChatMessage({
      id: new LiveChatMessageId(id),
      snippet: new Snippet({
        type: type,
        publishedAt: new PublishedAt(new Date(Number(timestampUsec) / 1000)),
        superChatDetails: undefined,
        superStickerDetails
      }),
      authorDetails: this.createAuthorDetails(
        authorExternalChannelId,
        authorName,
        authorPhoto,
        authorBadges
      )
    })
  }
}
