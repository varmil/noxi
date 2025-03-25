import { MembershipPrice } from '@domain/membership-price'
import { ChannelId } from '@domain/youtube'

export interface MembershipPriceRepository {
  findById: (channelId: ChannelId) => Promise<MembershipPrice | null>
}
