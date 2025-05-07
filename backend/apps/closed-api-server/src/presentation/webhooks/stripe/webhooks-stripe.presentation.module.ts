import { Module } from '@nestjs/common'
import { WebhooksStripeController } from '@presentation/webhooks/stripe/webhooks-stripe.controller'

@Module({
  imports: [],
  controllers: [WebhooksStripeController],
  providers: []
})
export class WebhooksStripePresentationModule {}
