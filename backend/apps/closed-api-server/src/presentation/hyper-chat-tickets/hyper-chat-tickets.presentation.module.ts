import { Module } from '@nestjs/common'
import { HyperChatTicketsController } from '@presentation/hyper-chat-tickets/hyper-chat-tickets.controller'
import { HyperChatTicketsScenario } from '@presentation/hyper-chat-tickets/hyper-chat-tickets.scenario'
import { AuthModule } from '@presentation/nestjs/guard/auth/auth.module'
import { HyperChatTicketProgressAppModule } from '@app/hyper-chat-ticket-progress/hyper-chat-ticket-progress.app.module'
import { HyperChatTicketsAppModule } from '@app/hyper-chat-tickets/hyper-chat-tickets.app.module'

@Module({
  imports: [AuthModule, HyperChatTicketsAppModule, HyperChatTicketProgressAppModule],
  controllers: [HyperChatTicketsController],
  providers: [HyperChatTicketsScenario],
  exports: [HyperChatTicketsScenario]
})
export class HyperChatTicketsPresentationModule {}
