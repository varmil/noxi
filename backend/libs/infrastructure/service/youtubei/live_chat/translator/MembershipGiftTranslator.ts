import { PublishedAt } from '@domain'
import {
  LiveChatMessage,
  MembershipDetails,
  LiveChatMessageId,
  Snippet,
  Type
} from '@domain/youtube/live-chat-message'
import { Count, IsGift } from '@domain/youtube/membership'
import { BaseTranslator } from '@infra/service/youtubei/live_chat/translator/BaseTranslator'
import { IMessageTranslator } from '@infra/service/youtubei/live_chat/translator/IMessageTranslator'
import { addChatItemActionItemSchema } from '@infra/service/youtubei/live_chat/YoutubeiLiveChatAPISchema'
import { z } from 'zod'

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

    const count = Number(primaryText?.runs?.[0]?.text)
    if (!count) {
      console.error('[MembershipGiftTranslator] primaryText is not defined')
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
