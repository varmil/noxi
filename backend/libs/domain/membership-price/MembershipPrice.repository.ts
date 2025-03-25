import { MembershipPrices } from '@domain/membership-price'

export interface MembershipPriceRepository {
  findAll: () => Promise<MembershipPrices>
}
