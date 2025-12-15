import {
  Author,
  DisplayName,
  ProfileImageUrl,
  IsChatSponsor
} from '@domain/author'
import { GroupName } from '@domain/group'
import { AmountMicros, Currency } from '@domain/lib/currency'
import { SuperChat, AmountDisplayString, UserComment } from '@domain/supers'
import { ChannelId, PublishedAt, VideoId } from '@domain/youtube'
import { LiveChatMessageId } from '@domain/youtube/live-chat-message'
import type { YoutubeStreamSuperChat as PrismaSuperChat } from '@prisma/generated/client'

export class SuperChatTranslator {
  constructor(private readonly row: PrismaSuperChat) {}

  translate(): SuperChat {
    const row = this.row

    return new SuperChat({
      id: new LiveChatMessageId(row.id),
      amountMicros: new AmountMicros(row.amountMicros),
      currency: new Currency(row.currency),
      amountDisplayString: new AmountDisplayString(row.amountDisplayString),
      userComment: new UserComment(row.userComment ?? ''),

      author: new Author({
        channelId: new ChannelId(row.authorChannelId),
        displayName: new DisplayName(row.authorDisplayName),
        profileImageUrl: new ProfileImageUrl(row.authorProfileImageUrl),
        isChatSponsor: new IsChatSponsor(row.authorIsChatSponsor)
      }),

      videoId: new VideoId(row.videoId),
      group: new GroupName(row.group),
      createdAt: new PublishedAt(row.createdAt)
    })
  }
}
