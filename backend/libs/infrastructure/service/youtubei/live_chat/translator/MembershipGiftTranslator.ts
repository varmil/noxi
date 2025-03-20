import { z } from 'zod'
import { PublishedAt } from '@domain'
import { Count, IsGift } from '@domain/membership/gift'
import {
  LiveChatMessage,
  MembershipDetails,
  LiveChatMessageId,
  Snippet,
  Type
} from '@domain/youtube/live-chat-message'
import { addChatItemActionItemSchema } from '@infra/service/youtubei/live_chat/YoutubeiLiveChatAPISchema'
import { BaseTranslator } from '@infra/service/youtubei/live_chat/translator/BaseTranslator'
import { IMessageTranslator } from '@infra/service/youtubei/live_chat/translator/IMessageTranslator'

export class MembershipGiftTranslator
  extends BaseTranslator
  implements IMessageTranslator
{
  constructor(
    private readonly renderer: z.infer<
      typeof addChatItemActionItemSchema
    >['liveChatSponsorshipsGiftPurchaseAnnouncementRenderer']
  ) {
    super()
  }

  translate(): LiveChatMessage | undefined {
    if (!this.renderer) return undefined

    const {
      id,
      timestampUsec,
      authorExternalChannelId,
      header: {
        liveChatSponsorshipsHeaderRenderer: {
          authorName,
          authorPhoto,
          primaryText,
          authorBadges
        }
      }
    } = this.renderer

    const type = new Type('membershipGiftingEvent')

    const count = Number(primaryText?.runs?.[1]?.text)
    if (!count) {
      console.error(
        `primaryText[1] is not defined: ${JSON.stringify(primaryText)}`
      )
      return undefined
    }

    const membershipDetails = new MembershipDetails({
      count: new Count(count),
      isGift: new IsGift(true)
    })

    return new LiveChatMessage({
      id: new LiveChatMessageId(id),
      snippet: new Snippet({
        type: type,
        publishedAt: new PublishedAt(new Date(Number(timestampUsec) / 1000)),
        membershipDetails
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
