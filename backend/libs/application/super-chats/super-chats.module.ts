import { Module } from '@nestjs/common'
import { SuperChatsService } from '@app/super-chats/super-chats.service'
import { ExchangeRateInfraModule } from '@infra/exchange-rate/exchange-rate.infra.module'
import { SuperChatInfraModule } from '@infra/super-chat/super-chat.infra.module'

@Module({
  imports: [ExchangeRateInfraModule, SuperChatInfraModule],
  providers: [SuperChatsService],
  exports: [ExchangeRateInfraModule, SuperChatInfraModule, SuperChatsService]
})
export class SuperChatsModule {}
