import { z } from 'zod'
import { PublishedAt } from '@domain'
import {
  LiveChatMessage,
  MembershipDetails,
  Type,
  Snippet,
  LiveChatMessageId
} from '@domain/youtube/live-chat-message'
import { Count, IsGift } from '@domain/youtube/membership'
import { addChatItemActionItemSchema } from '@infra/service/youtubei/live_chat/YoutubeiLiveChatAPISchema'
import { BaseTranslator } from '@infra/service/youtubei/live_chat/translator/BaseTranslator'
import { IMessageTranslator } from '@infra/service/youtubei/live_chat/translator/IMessageTranslator'

export class MembershipItemTranslator
  extends BaseTranslator
  implements IMessageTranslator
{
  constructor(
    private readonly renderer: z.infer<
      typeof addChatItemActionItemSchema
    >['liveChatMembershipItemRenderer']
  ) {
    super()
  }

  translate(): LiveChatMessage | undefined {
    if (!this.renderer) return undefined

    const {
      id,
      authorName,
      authorPhoto,
      authorExternalChannelId,
      timestampUsec,
      authorBadges
    } = this.renderer

    const type = new Type('newSponsorEvent')

    const membershipDetails = new MembershipDetails({
      count: new Count(1),
      isGift: new IsGift(false)
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
