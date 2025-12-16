import {
  Author,
  DisplayName,
  IsChatSponsor,
  ProfileImageUrl
} from '@domain/author'
import { GroupId } from '@domain/group'
import { AmountMicros, Currency } from '@domain/lib/currency'
import { SuperSticker, AmountDisplayString } from '@domain/supers'
import { ChannelId, PublishedAt, VideoId } from '@domain/youtube'
import { LiveChatMessageId } from '@domain/youtube/live-chat-message'
import type { YoutubeStreamSuperSticker as PrismaSuperSticker } from '@prisma/generated/client'

export class SuperStickerTranslator {
  constructor(private readonly row: PrismaSuperSticker) {}

  translate(): SuperSticker {
    const row = this.row

    return new SuperSticker({
      id: new LiveChatMessageId(row.id),
      amountMicros: new AmountMicros(row.amountMicros),
      currency: new Currency(row.currency),
      amountDisplayString: new AmountDisplayString(row.amountDisplayString),

      author: new Author({
        channelId: new ChannelId(row.authorChannelId),
        displayName: new DisplayName(row.authorDisplayName),
        profileImageUrl: new ProfileImageUrl(row.authorProfileImageUrl),
        isChatSponsor: new IsChatSponsor(row.authorIsChatSponsor)
      }),

      videoId: new VideoId(row.videoId),
      group: new GroupId(row.group),
      createdAt: new PublishedAt(row.createdAt)
    })
  }
}
