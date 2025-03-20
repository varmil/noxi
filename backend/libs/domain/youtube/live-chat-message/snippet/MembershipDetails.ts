import { Count, IsGift } from '@domain/membership/gift'

/**
 * liveChatMembershipItemRenderer
 * liveChatSponsorshipsGiftPurchaseAnnouncementRenderer
 * に該当するクラス
 */
export class MembershipDetails {
  public readonly count: Count
  public readonly isGift: IsGift

  constructor(args: { count: Count; isGift: IsGift }) {
    this.count = args.count
    this.isGift = args.isGift
  }
}
