import { type youtube_v3 } from '@googleapis/youtube'
import { z } from 'zod'
import {
  AmountDisplayString,
  AmountMicros,
  Currency,
  StickerId,
  Tier,
  UserComment
} from '@domain/supers'
import {
  ChannelURL,
  DisplayName,
  IsChatSponsor,
  ProfileImageUrl
} from '@domain/supers/base/author'
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
      authorDetails: {
        channelId,
        channelUrl,
        displayName,
        profileImageUrl,
        isChatSponsor
      }
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
        ...item.authorDetails,
        channelId: new ChannelId(channelId),
        channelUrl: new ChannelURL(channelUrl),
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
      const { amountMicros, currency, amountDisplayString, tier, userComment } =
        snippet.superChatDetails
      superChatDetails = new SuperChatDetails({
        amountMicros: new AmountMicros(Number(amountMicros)),
        currency: new Currency(currency),
        amountDisplayString: new AmountDisplayString(amountDisplayString),
        tier: new Tier(tier),
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
      const {
        amountMicros,
        currency,
        amountDisplayString,
        tier,
        superStickerMetadata: { stickerId }
      } = snippet.superStickerDetails

      superStickerDetails = new SuperStickerDetails({
        amountMicros: new AmountMicros(Number(amountMicros)),
        currency: new Currency(currency),
        amountDisplayString: new AmountDisplayString(amountDisplayString),
        tier: new Tier(tier),
        stickerId: new StickerId(stickerId)
      })
    }
    return superStickerDetails
  }
}
