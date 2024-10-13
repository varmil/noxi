import { Group } from '@domain/group'
import {
  AmountDisplayString,
  AmountMicros,
  Currency,
  Tier
} from '@domain/super-xxx'
import { SuperSticker, StickerId } from '@domain/super-xxx/sticker'
import { VideoId } from '@domain/youtube'
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
      stickerId: new StickerId(row.stickerId)
    })
  }
}
