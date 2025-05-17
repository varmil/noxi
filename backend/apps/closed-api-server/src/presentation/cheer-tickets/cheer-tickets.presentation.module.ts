import { Module } from '@nestjs/common'
import { CheerTicketsController } from '@presentation/cheer-tickets/cheer-tickets.controller'
import { AuthModule } from '@presentation/nestjs/guard/auth/auth.module'
import { CheerTicketsAppModule } from '@app/cheer-tickets/cheer-tickets.app.module'

@Module({
  imports: [AuthModule, CheerTicketsAppModule],
  controllers: [CheerTicketsController],
  providers: []
})
export class CheerTicketsPresentationModule {}
