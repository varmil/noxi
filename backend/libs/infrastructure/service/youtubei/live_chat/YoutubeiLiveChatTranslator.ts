import { z } from 'zod'
import { AmountDisplayString, Tier, UserComment } from '@domain/supers'
import {
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
  Type
} from '@domain/youtube/live-chat-message'
import { PurchaseAmountText } from '@domain/youtubei/live-chat/PurchaseAmountText.vo'
import {
  addChatItemActionItemSchema,
  authorBadgesSchema
} from '@infra/service/youtubei/live_chat'

export class YoutubeiLiveChatTranslator {
  constructor(
    private readonly item?: z.infer<typeof addChatItemActionItemSchema>
  ) {}

  translate(): LiveChatMessage | undefined {
    const item = this.item
    if (!item) return undefined

    const { liveChatTextMessageRenderer, liveChatPaidMessageRenderer } = item

    const superChatDetails = this.getSuperChatDetails(
      liveChatPaidMessageRenderer
    )
    // const superStickerDetails = this.getSuperStickerDetails(snippet)

    const renderer = liveChatPaidMessageRenderer ?? liveChatTextMessageRenderer
    if (!renderer) return undefined

    const {
      id,
      authorName,
      authorPhoto,
      authorExternalChannelId,
      timestampUsec,
      authorBadges
    } = renderer

    // TODO:
    const type = liveChatPaidMessageRenderer
      ? new Type('superChatEvent')
      : new Type('textMessageEvent')

    return new LiveChatMessage({
      id: new LiveChatMessageId(id),
      snippet: new Snippet({
        type: type,
        publishedAt: new PublishedAt(new Date(Number(timestampUsec) / 1000)),
        superChatDetails,
        superStickerDetails: undefined // TODO:
      }),
      authorDetails: new AuthorDetails({
        channelId: new ChannelId(authorExternalChannelId),
        displayName: new DisplayName(authorName?.simpleText ?? ''),
        profileImageUrl: new ProfileImageUrl(authorPhoto.thumbnails[0].url),
        isChatSponsor: new IsChatSponsor(this.isChatSponsor(authorBadges))
      })
    })
  }

  private getSuperChatDetails(
    liveChatPaidMessageRenderer: z.infer<
      typeof addChatItemActionItemSchema
    >['liveChatPaidMessageRenderer']
  ) {
    if (!liveChatPaidMessageRenderer) return undefined
    const { message, purchaseAmountText } = liveChatPaidMessageRenderer

    try {
      const { symbol, amountMicros } = new PurchaseAmountText(
        purchaseAmountText.simpleText
      ).parse()

      const superChatDetails = new SuperChatDetails({
        amountMicros,
        currency: symbol.ToCurrency(),
        amountDisplayString: new AmountDisplayString(
          purchaseAmountText.simpleText
        ),
        tier: new Tier(0), // TODO:
        userComment: new UserComment(
          message?.runs.map(run => run.text).join('') ?? ''
        )
      })
      return superChatDetails
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  // private getSuperStickerDetails(
  //   snippet: z.infer<typeof liveChatMessagesAPISchema>['snippet']
  // ) {
  //   let superStickerDetails: SuperStickerDetails | undefined = undefined
  //   if (snippet.superStickerDetails) {
  //     const {
  //       amountMicros,
  //       currency,
  //       amountDisplayString,
  //       tier,
  //       superStickerMetadata: { stickerId }
  //     } = snippet.superStickerDetails

  //     superStickerDetails = new SuperStickerDetails({
  //       amountMicros: new AmountMicros(BigNumber(amountMicros)),
  //       currency: new Currency(currency),
  //       amountDisplayString: new AmountDisplayString(amountDisplayString),
  //       tier: new Tier(tier),
  //       stickerId: new StickerId(stickerId)
  //     })
  //   }
  //   return superStickerDetails
  // }

  private isChatSponsor(badges: z.infer<typeof authorBadgesSchema>) {
    return !!badges?.some(
      badge =>
        badge.liveChatAuthorBadgeRenderer.tooltip.includes('Member') ||
        badge.liveChatAuthorBadgeRenderer.tooltip.includes('member')
    )
  }
}
