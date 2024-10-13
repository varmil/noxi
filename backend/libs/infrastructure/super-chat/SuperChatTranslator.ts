import { Group } from '@domain/group'
import {
  AmountDisplayString,
  AmountMicros,
  Currency,
  Tier
} from '@domain/super-xxx'
import {
  Author,
  DisplayName,
  ProfileImageUrl,
  IsChatSponsor
} from '@domain/super-xxx/base/author'
import { SuperChat, UserComment } from '@domain/super-xxx/chat'
import { ChannelId, VideoId } from '@domain/youtube'
import type { YoutubeStreamSuperChat as PrismaSuperChat } from '@prisma/client'

export class SuperChatTranslator {
  constructor(private readonly row: PrismaSuperChat) {}

  translate(): SuperChat {
    const row = this.row

    return new SuperChat({
      videoId: new VideoId(row.videoId),
      group: new Group(row.group),
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
      })
    })
  }
}
