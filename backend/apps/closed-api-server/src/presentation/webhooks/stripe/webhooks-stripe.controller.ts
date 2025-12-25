import {
  Controller,
  Post,
  Req,
  Res,
  Headers,
  HttpException,
  HttpStatus,
  Logger,
  RawBodyRequest
} from '@nestjs/common'
import { Request, Response } from 'express'
import Stripe from 'stripe'

@Controller('webhooks/stripe')
export class WebhooksStripeController {
  private readonly logger = new Logger(WebhooksStripeController.name)
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-12-15.clover'
    })
  }

  @Post()
  handleStripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string
  ) {
    const payload = req.rawBody
    if (!payload) {
      throw new HttpException('No raw body', HttpStatus.BAD_REQUEST)
    }

    let event: Stripe.Event

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      )
    } catch (err) {
      console.error('Webhook signature verification failed.', err)
      throw new HttpException('Invalid signature', HttpStatus.BAD_REQUEST)
    }

    switch (event.type) {
      // 初回の Checkout セッション完了時（ユーザーが決済成功）。2回目以降は呼ばれない
      case 'checkout.session.completed': {
        const session = event.data.object
        this.logger.log(`Checkout session completed:`, session)
        break
      }
      // 初回も2ヶ月目以降も請求が成功したときに呼ばれる
      case 'invoice.paid': {
        const invoice = event.data.object
        const subscriptionId = invoice.lines.data[0].subscription as string
        const customerId = invoice.customer as string
        this.logger.log(
          `Invoice paid: customer=${customerId}, subscription=${subscriptionId}`
        )
        // Example: 2回目以降の支払い（更新）に対する処理
        // if (invoice.billing_reason === 'subscription_cycle') {
        //   await this.ticketService.grantSupportTickets(invoice.customer as string, 20)
        // }

        // チケット20枚を付与（あなたのロジックをここに）
        // await this.ticketService.grantSupportTickets(customerId, 20)
        break
      }
      // 管理画面からキャンセル / API経由でキャンセル / 支払い失敗による自動キャンセル
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        this.logger.log(
          `Subscription deleted: ${subscription.customer as string}`
        )
        break
      }
      default:
        this.logger.log(`Unhandled event type ${event.type}`)
    }

    res.json({ received: true })
  }
}
