import { Module } from '@nestjs/common'
import { HyperChatTicketProgressService } from '@app/hyper-chat-ticket-progress/hyper-chat-ticket-progress.service'
import { HyperChatTicketProgressInfraModule } from '@infra/hyper-chat-ticket-progress/hyper-chat-ticket-progress.infra.module'

@Module({
  imports: [HyperChatTicketProgressInfraModule],
  providers: [HyperChatTicketProgressService],
  exports: [HyperChatTicketProgressInfraModule, HyperChatTicketProgressService]
})
export class HyperChatTicketProgressAppModule {}
