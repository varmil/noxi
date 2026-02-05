import { Module } from '@nestjs/common'
import { HyperChatsController } from '@presentation/hyper-chats/hyper-chats.controller'
import { HyperChatsScenario } from '@presentation/hyper-chats/hyper-chats.scenario'
import { AuthModule } from '@presentation/nestjs/guard/auth/auth.module'
import { HyperChatLikesAppModule } from '@app/hyper-chat-likes/hyper-chat-likes.app.module'
import { HyperChatOrdersAppModule } from '@app/hyper-chat-orders/hyper-chat-orders.app.module'
import { HyperChatsAppModule } from '@app/hyper-chats/hyper-chats.app.module'

@Module({
  imports: [
    AuthModule,
    HyperChatsAppModule,
    HyperChatLikesAppModule,
    HyperChatOrdersAppModule
  ],
  controllers: [HyperChatsController],
  providers: [HyperChatsScenario],
  exports: [HyperChatsScenario]
})
export class HyperChatsPresentationModule {}
