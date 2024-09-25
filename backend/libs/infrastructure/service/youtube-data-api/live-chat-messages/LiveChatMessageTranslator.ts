import { type youtube_v3 } from '@googleapis/youtube'
import { z } from 'zod'
import { PublishedAt } from '@domain/youtube'
import {
  LiveChatMessage,
  Snippet,
  SuperChatDetails,
  SuperStickerDetails,
  Type
} from '@domain/youtube/live-chat-message'
import { liveChatMessagesAPISchema } from '@infra/service/youtube-data-api/live-chat-messages/LiveChatMessagesAPISchema'

export class LiveChatMessageTranslator {
  constructor(private readonly item: youtube_v3.Schema$LiveChatMessage) {}

  translate(): LiveChatMessage | undefined {
    const item = this.parse()
    if (!item) return undefined

    const { snippet } = item

    let superChatDetails: SuperChatDetails | undefined
    if (snippet.superChatDetails) {
      superChatDetails = new SuperChatDetails({
        amountMicros: Number(snippet.superChatDetails.amountMicros),
        currency: snippet.superChatDetails.currency,
        amountDisplayString: snippet.superChatDetails.amountDisplayString,
        tier: snippet.superChatDetails.tier
      })
    }

    let superStickerDetails: SuperStickerDetails | undefined = undefined
    if (snippet.superStickerDetails) {
      superStickerDetails = new SuperStickerDetails({
        amountMicros: Number(snippet.superStickerDetails.amountMicros),
        currency: snippet.superStickerDetails.currency,
        amountDisplayString: snippet.superStickerDetails.amountDisplayString,
        tier: snippet.superStickerDetails.tier
      })
    }

    return new LiveChatMessage({
      snippet: new Snippet({
        type: new Type(snippet.type),
        publishedAt: new PublishedAt(new Date(snippet.publishedAt)),
        superChatDetails,
        superStickerDetails
      }),
      authorDetails: item.authorDetails
    })
  }

  private parse() {
    try {
      return liveChatMessagesAPISchema.parse(this.item)
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues)
        return undefined
      } else {
        throw err
      }
    }
  }
}
