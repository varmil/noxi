import { type youtube_v3 } from '@googleapis/youtube'
import { z } from 'zod'
import { DisplayName, IsChatSponsor, ProfileImageUrl } from '@domain/author'
import { AmountMicros, Currency } from '@domain/lib/currency'
import { AmountDisplayString, UserComment } from '@domain/supers'
import { ChannelId, PublishedAt } from '@domain/youtube'
import {
  AuthorDetails,
  LiveChatMessage,
  LiveChatMessageId,
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

    const {
      id,
      snippet,
      authorDetails: { channelId, displayName, profileImageUrl, isChatSponsor }
    } = item

    const superChatDetails = this.getSuperChatDetails(snippet)
    const superStickerDetails = this.getSuperStickerDetails(snippet)

    return new LiveChatMessage({
      id: new LiveChatMessageId(id),
      snippet: new Snippet({
        type: new Type(snippet.type),
        publishedAt: new PublishedAt(new Date(snippet.publishedAt)),
        superChatDetails,
        superStickerDetails
      }),
      authorDetails: new AuthorDetails({
        channelId: new ChannelId(channelId),
        displayName: new DisplayName(displayName),
        profileImageUrl: new ProfileImageUrl(profileImageUrl),
        isChatSponsor: new IsChatSponsor(isChatSponsor)
      })
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

  private getSuperChatDetails(
    snippet: z.infer<typeof liveChatMessagesAPISchema>['snippet']
  ) {
    let superChatDetails: SuperChatDetails | undefined
    if (snippet.superChatDetails) {
      const { amountMicros, currency, amountDisplayString, userComment } =
        snippet.superChatDetails
      superChatDetails = new SuperChatDetails({
        amountMicros: new AmountMicros(amountMicros),
        currency: new Currency(currency),
        amountDisplayString: new AmountDisplayString(amountDisplayString),
        userComment: new UserComment(userComment ?? '')
      })
    }
    return superChatDetails
  }

  private getSuperStickerDetails(
    snippet: z.infer<typeof liveChatMessagesAPISchema>['snippet']
  ) {
    let superStickerDetails: SuperStickerDetails | undefined = undefined
    if (snippet.superStickerDetails) {
      const { amountMicros, currency, amountDisplayString } =
        snippet.superStickerDetails

      superStickerDetails = new SuperStickerDetails({
        amountMicros: new AmountMicros(amountMicros),
        currency: new Currency(currency),
        amountDisplayString: new AmountDisplayString(amountDisplayString)
      })
    }
    return superStickerDetails
  }
}
