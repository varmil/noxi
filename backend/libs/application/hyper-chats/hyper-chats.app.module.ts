import { Module } from '@nestjs/common'
import { HyperChatsService } from '@app/hyper-chats/hyper-chats.service'
import { HyperChatInfraModule } from '@infra/hyper-chat/hyper-chat.infra.module'

@Module({
  imports: [HyperChatInfraModule],
  providers: [HyperChatsService],
  exports: [HyperChatInfraModule, HyperChatsService]
})
export class HyperChatsAppModule {}
