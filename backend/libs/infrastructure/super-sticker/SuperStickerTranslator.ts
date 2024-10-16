import { Group } from '@domain/group'
import {
  SuperSticker,
  AmountDisplayString,
  AmountMicros,
  Currency,
  Tier,
  StickerId
} from '@domain/supers'
import {
  Author,
  DisplayName,
  IsChatSponsor,
  ProfileImageUrl
} from '@domain/supers/base/author'
import { ChannelId, VideoId } from '@domain/youtube'
import { LiveChatMessageId } from '@domain/youtube/live-chat-message'
import type { YoutubeStreamSuperSticker as PrismaSuperSticker } from '@prisma/client'

export class SuperStickerTranslator {
  constructor(private readonly row: PrismaSuperSticker) {}

  translate(): SuperSticker {
    const row = this.row

    return new SuperSticker({
      id: new LiveChatMessageId(row.id),
      amountMicros: new AmountMicros(Number(row.amountMicros)),
      currency: new Currency(row.currency),
      amountDisplayString: new AmountDisplayString(row.amountDisplayString),
      tier: new Tier(row.tier),
      stickerId: new StickerId(row.stickerId),

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
