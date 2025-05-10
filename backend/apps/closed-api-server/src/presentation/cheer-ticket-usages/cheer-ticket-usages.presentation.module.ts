import { Module } from '@nestjs/common'
import { CheerTicketUsagesController } from '@presentation/cheer-ticket-usages/cheer-ticket-usages.controller'
import { CheerTicketUsagesAppModule } from '@app/cheer-ticket-usages/cheer-ticket-usages.app.module'

@Module({
  imports: [CheerTicketUsagesAppModule],
  controllers: [CheerTicketUsagesController],
  providers: []
})
export class CheerTicketUsagesPresentationModule {}
