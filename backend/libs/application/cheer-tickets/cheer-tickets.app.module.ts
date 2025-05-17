import { Module } from '@nestjs/common'
import { CheerTicketsService } from '@app/cheer-tickets/cheer-tickets.service'
import { CheerTicketInfraModule } from '@infra/cheer-ticket/cheer-ticket.infra.module'

@Module({
  imports: [CheerTicketInfraModule],
  providers: [CheerTicketsService],
  exports: [CheerTicketInfraModule, CheerTicketsService]
})
export class CheerTicketsAppModule {}
