import { GroupId } from '@domain/group'
import { Message, Status, Tier } from '@domain/hyper-chat'
import {
  Amount,
  HyperChatOrder,
  HyperChatOrderId,
  StripePaymentIntentId
} from '@domain/hyper-chat-order'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

export interface HyperChatOrderRepository {
  /**
   * 注文を作成（pending 状態）
   */
  create: (args: {
    data: {
      stripePaymentIntentId: StripePaymentIntentId
      userId: UserId
      channelId: ChannelId
      group: GroupId
      gender: Gender
      tier: Tier
      amount: Amount
      message: Message
    }
  }) => Promise<HyperChatOrder>

  /**
   * ステータスを更新
   */
  updateStatus: (args: {
    id: HyperChatOrderId
    status: Status
  }) => Promise<void>

  /**
   * stripePaymentIntentId で検索して completed に更新
   * 冪等性のため、すでに completed なら何もしない
   * @returns 更新された order、すでに completed なら null
   */
  completeByPaymentIntentId: (args: {
    stripePaymentIntentId: StripePaymentIntentId
  }) => Promise<HyperChatOrder | null>

  /**
   * stripePaymentIntentId で検索して failed に更新
   */
  failByPaymentIntentId: (args: {
    stripePaymentIntentId: StripePaymentIntentId
  }) => Promise<void>

  /**
   * ID で検索
   */
  findById: (id: HyperChatOrderId) => Promise<HyperChatOrder | null>

  /**
   * stripePaymentIntentId で検索
   */
  findByPaymentIntentId: (
    stripePaymentIntentId: StripePaymentIntentId
  ) => Promise<HyperChatOrder | null>
}
