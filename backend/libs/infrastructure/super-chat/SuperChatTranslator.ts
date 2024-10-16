import { Group } from '@domain/group'
import {
  SuperChat,
  AmountDisplayString,
  AmountMicros,
  Currency,
  Tier,
  UserComment
} from '@domain/supers'
import {
  Author,
  DisplayName,
  ProfileImageUrl,
  IsChatSponsor
} from '@domain/supers/base/author'
import { ChannelId, VideoId } from '@domain/youtube'
import { LiveChatMessageId } from '@domain/youtube/live-chat-message'
import type { YoutubeStreamSuperChat as PrismaSuperChat } from '@prisma/client'

export class SuperChatTranslator {
  constructor(private readonly row: PrismaSuperChat) {}

  translate(): SuperChat {
    const row = this.row

    return new SuperChat({
      id: new LiveChatMessageId(row.id),
      amountMicros: new AmountMicros(Number(row.amountMicros)),
      currency: new Currency(row.currency),
      amountDisplayString: new AmountDisplayString(row.amountDisplayString),
      tier: new Tier(row.tier),
      userComment: new UserComment(row.userComment),

      author: new Author({
        channelId: new ChannelId(row.authorChannelId),
        displayName: new DisplayName(row.authorDisplayName),
        profileImageUrl: new ProfileImageUrl(row.authorProfileImageUrl),
        isChatSponsor: new IsChatSponsor(row.authorIsChatSponsor)
      }),

      videoId: new VideoId(row.videoId),
      group: new Group(row.group)
    })
  }
}
