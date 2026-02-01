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
import { HyperChatsScenario } from '@presentation/hyper-chats/hyper-chats.scenario'

@Controller('webhooks/stripe')
export class WebhooksStripeController {
  private readonly logger = new Logger(WebhooksStripeController.name)
  private stripe: Stripe

  constructor(private readonly hyperChatsScenario: HyperChatsScenario) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2026-01-28.clover'
    })
  }

  @Post()
  async handleStripeWebhook(
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
      // PaymentIntent 成功時
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object
        const productType = paymentIntent.metadata.product_type
        this.logger.log(
          `Payment intent succeeded: ${paymentIntent.id}, product_type: ${productType}`
        )

        switch (productType) {
          case 'hyper_chat':
            await this.hyperChatsScenario.handlePaymentSuccess({
              stripePaymentIntentId: paymentIntent.id
            })
            break
          default:
            this.logger.warn(`Unknown product type: ${productType}`)
        }
        break
      }
      // PaymentIntent 失敗時
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        const productType = paymentIntent.metadata.product_type
        this.logger.log(
          `Payment intent failed: ${paymentIntent.id}, product_type: ${productType}`
        )

        switch (productType) {
          case 'hyper_chat':
            await this.hyperChatsScenario.handlePaymentFailed(paymentIntent.id)
            break
          default:
            this.logger.warn(`Unknown product type: ${productType}`)
        }
        break
      }
      // サブスクリプション関連（将来の拡張用）
      case 'invoice.paid': {
        const invoice = event.data.object
        const subscriptionId = invoice.lines.data[0]?.subscription as
          | string
          | undefined
        const customerId = invoice.customer as string
        this.logger.log(
          `Invoice paid: customer=${customerId}, subscription=${subscriptionId}`
        )
        break
      }
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
