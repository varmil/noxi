import BigNumber from 'bignumber.js'
import { Group } from '@domain/group'
import { Currency } from '@domain/lib/currency'
import { SuperSticker, AmountDisplayString, AmountMicros } from '@domain/supers'
import {
  Author,
  DisplayName,
  IsChatSponsor,
  ProfileImageUrl
} from '@domain/supers/base/author'
import { ChannelId, PublishedAt, VideoId } from '@domain/youtube'
import { LiveChatMessageId } from '@domain/youtube/live-chat-message'
import type { YoutubeStreamSuperSticker as PrismaSuperSticker } from '@prisma/client'

export class SuperStickerTranslator {
  constructor(private readonly row: PrismaSuperSticker) {}

  translate(): SuperSticker {
    const row = this.row

    return new SuperSticker({
      id: new LiveChatMessageId(row.id),
      amountMicros: new AmountMicros(BigNumber(row.amountMicros.toString())),
      currency: new Currency(row.currency),
      amountDisplayString: new AmountDisplayString(row.amountDisplayString),

      author: new Author({
        channelId: new ChannelId(row.authorChannelId),
        displayName: new DisplayName(row.authorDisplayName),
        profileImageUrl: new ProfileImageUrl(row.authorProfileImageUrl),
        isChatSponsor: new IsChatSponsor(row.authorIsChatSponsor)
      }),

      videoId: new VideoId(row.videoId),
      group: new Group(row.group),
      createdAt: new PublishedAt(row.createdAt)
    })
  }
}
