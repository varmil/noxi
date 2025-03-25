import { Collection } from '@domain/lib/Collection'
import { MembershipPrice, PriceMicros } from '@domain/membership-price'
import { ChannelId } from '@domain/youtube'

export class MembershipPrices extends Collection<MembershipPrice> {
  constructor(protected readonly list: MembershipPrice[]) {
    super(list)
  }

  getPrice(channelId: ChannelId): PriceMicros {
    const e = this.list.find(r => r.channelId.equals(channelId))
    if (!e) {
      throw new Error(`Unsupported channelId: ${channelId.get()}`)
    }
    return e.priceMicros
  }
}
