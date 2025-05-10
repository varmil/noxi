import { Module } from '@nestjs/common'
import { CheerTicketUsagesService } from '@app/cheer-ticket-usages/cheer-ticket-usages.service'
import { CheerTicketUsageInfraModule } from '@infra/cheer-ticket-usage/cheer-ticket-usage.infra.module'

@Module({
  imports: [CheerTicketUsageInfraModule],
  providers: [CheerTicketUsagesService],
  exports: [CheerTicketUsageInfraModule, CheerTicketUsagesService]
})
export class CheerTicketUsagesAppModule {}
