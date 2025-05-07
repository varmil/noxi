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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-04-30.basil'
})

@Controller('webhooks/stripe')
export class WebhooksStripeController {
  private readonly logger = new Logger(WebhooksStripeController.name)

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
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      )
    } catch (err) {
      console.error('Webhook signature verification failed.', err)
      throw new HttpException('Invalid signature', HttpStatus.BAD_REQUEST)
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        this.logger.log(`Checkout session completed:`, session)
        break
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object
        this.logger.log(
          `Subscription updated: ${subscription.customer as string}`
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

    return res.json({ received: true })
  }
}
