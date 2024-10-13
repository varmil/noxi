import { Module } from '@nestjs/common'
import { SuperChatsService } from '@app/super-chats/super-chats.service'
import { SuperChatInfraModule } from '@infra/super-chat/super-chat.infra.module'

@Module({
  imports: [SuperChatInfraModule],
  providers: [SuperChatsService],
  exports: [SuperChatInfraModule, SuperChatsService]
})
export class SuperChatsModule {}
