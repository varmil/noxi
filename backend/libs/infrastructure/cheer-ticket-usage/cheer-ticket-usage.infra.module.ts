import { Module } from '@nestjs/common'
import { CheerTicketUsageRepositoryImpl } from '@infra/cheer-ticket-usage/CheerTicketUsage.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    CheerTicketUsageRepositoryImpl,
    {
      provide: 'CheerTicketUsageRepository',
      useClass: CheerTicketUsageRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    CheerTicketUsageRepositoryImpl,
    {
      provide: 'CheerTicketUsageRepository',
      useClass: CheerTicketUsageRepositoryImpl
    }
  ]
})
export class CheerTicketUsageInfraModule {}
