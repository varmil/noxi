import { Module } from '@nestjs/common'
import { HyperChatTicketsService } from '@app/hyper-chat-tickets/hyper-chat-tickets.service'
import { HyperChatTicketInfraModule } from '@infra/hyper-chat-ticket/hyper-chat-ticket.infra.module'

@Module({
  imports: [HyperChatTicketInfraModule],
  providers: [HyperChatTicketsService],
  exports: [HyperChatTicketInfraModule, HyperChatTicketsService]
})
export class HyperChatTicketsAppModule {}
