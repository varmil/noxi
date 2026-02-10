import { Injectable, Logger } from '@nestjs/common'
import Stripe from 'stripe'
import { HyperChatOrdersService } from '@app/hyper-chat-orders/hyper-chat-orders.service'
import { HyperChatsService } from '@app/hyper-chats/hyper-chats.service'
import { GroupId } from '@domain/group'
import { HyperChat, Message, Tier } from '@domain/hyper-chat'
import {
  Amount,
  HyperChatOrderId,
  StripePaymentIntentId
} from '@domain/hyper-chat-order'
import { Gender } from '@domain/lib'
import { Email, UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

@Injectable()
export class HyperChatsScenario {
  private readonly logger = new Logger(HyperChatsScenario.name)
  private stripe: Stripe

  constructor(
    private readonly hyperChatOrdersService: HyperChatOrdersService,
    private readonly hyperChatsService: HyperChatsService
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2026-01-28.clover'
    })
  }

  /**
   * Stripe PaymentIntentを作成（Elements用）
   * 1. PaymentIntentを作成
   * 2. HyperChatOrderをpending状態で作成
   * 3. clientSecretとorderIdを返却
   */
  async createPaymentIntent(args: {
    userId: UserId
    email: Email
    channelId: ChannelId
    group: GroupId
    gender: Gender
    tier: Tier
    message: Message
  }): Promise<{ clientSecret: string; orderId: number }> {
    const { userId, email, channelId, group, gender, tier, message } = args
    const amount = tier.getPrice()

    // 1. PaymentIntentを作成
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'jpy',
      receipt_email: email.get(),
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      },
      metadata: {
        product_type: 'hyper_chat', // 商品タイプを識別（将来の拡張用）
        userId: userId.get().toString(),
        channelId: channelId.get(),
        tier: tier.get()
      }
    })

    // 2. HyperChatOrderをpending状態で作成
    const order = await this.hyperChatOrdersService.create({
      data: {
        stripePaymentIntentId: new StripePaymentIntentId(paymentIntent.id),
        userId,
        channelId,
        group,
        gender,
        tier,
        amount: new Amount(amount),
        message
      }
    })

    this.logger.log(
      `Created payment intent: ${paymentIntent.id} for Order: ${order.id.get()}`
    )

    return {
      clientSecret: paymentIntent.client_secret!,
      orderId: order.id.get()
    }
  }

  /**
   * Stripe Webhookでの決済完了時に呼び出される
   * 1. Orderをcompletedに更新（冪等性: すでにcompletedならスキップ）
   * 2. HyperChatを作成
   */
  async handlePaymentSuccess(args: {
    stripePaymentIntentId: string
  }): Promise<HyperChat | null> {
    const { stripePaymentIntentId } = args

    // 1. Orderをcompletedに更新（冪等性対応）
    const order = await this.hyperChatOrdersService.completeByPaymentIntentId({
      stripePaymentIntentId: new StripePaymentIntentId(stripePaymentIntentId)
    })

    // すでにcompletedだった場合はスキップ
    if (!order) {
      this.logger.log(
        `Order already completed or not found: ${stripePaymentIntentId}`
      )
      return null
    }

    // 2. HyperChatを作成
    const hyperChat = await this.hyperChatsService.create({
      data: {
        orderId: order.id,
        userId: order.userId,
        channelId: order.channelId,
        group: order.group,
        gender: order.gender,
        tier: order.tier,
        amount: order.amount,
        message: order.message
      }
    })

    this.logger.log(
      `Created HyperChat ${hyperChat.id.get()} from Order ${order.id.get()}`
    )

    // 3. Next.js のキャッシュを無効化
    await this.hyperChatsService.revalidateCache(order.channelId.get())

    return hyperChat
  }

  /**
   * 決済失敗/キャンセル時に呼び出される
   */
  async handlePaymentFailed(stripePaymentIntentId: string): Promise<void> {
    await this.hyperChatOrdersService.failByPaymentIntentId({
      stripePaymentIntentId: new StripePaymentIntentId(stripePaymentIntentId)
    })
    this.logger.log(`Order failed: ${stripePaymentIntentId}`)
  }

  /**
   * OrderIdからHyperChatを取得
   */
  async findByOrderId(orderId: HyperChatOrderId): Promise<HyperChat | null> {
    return await this.hyperChatsService.findByOrderId(orderId)
  }
}
