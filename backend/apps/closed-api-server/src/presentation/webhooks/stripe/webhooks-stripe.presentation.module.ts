import { Module } from '@nestjs/common'
import { HyperChatsPresentationModule } from '@presentation/hyper-chats/hyper-chats.presentation.module'
import { WebhooksStripeController } from '@presentation/webhooks/stripe/webhooks-stripe.controller'

@Module({
  imports: [HyperChatsPresentationModule],
  controllers: [WebhooksStripeController],
  providers: []
})
export class WebhooksStripePresentationModule {}
