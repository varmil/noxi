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
  IsChatSponsor,
  ProfileImageUrl
} from '@domain/super-xxx/base/author'
import { SuperSticker, StickerId } from '@domain/super-xxx/sticker'
import { ChannelId, VideoId } from '@domain/youtube'
import type { YoutubeStreamSuperSticker as PrismaSuperSticker } from '@prisma/client'

export class SuperStickerTranslator {
  constructor(private readonly row: PrismaSuperSticker) {}

  translate(): SuperSticker {
    const row = this.row

    return new SuperSticker({
      videoId: new VideoId(row.videoId),
      group: new Group(row.group),
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
      })
    })
  }
}
