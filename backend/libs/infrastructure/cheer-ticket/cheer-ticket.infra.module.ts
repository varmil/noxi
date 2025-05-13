import { Module } from '@nestjs/common'
import { CheerTicketRepositoryImpl } from '@infra/cheer-ticket/CheerTicket.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    CheerTicketRepositoryImpl,
    {
      provide: 'CheerTicketRepository',
      useClass: CheerTicketRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    CheerTicketRepositoryImpl,
    {
      provide: 'CheerTicketRepository',
      useClass: CheerTicketRepositoryImpl
    }
  ]
})
export class CheerTicketInfraModule {}
