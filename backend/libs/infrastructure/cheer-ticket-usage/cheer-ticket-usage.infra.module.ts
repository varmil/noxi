import { Module } from '@nestjs/common'
import { CheerRankingRepositoryImpl } from '@infra/cheer-ticket-usage/CheerRanking.repository-impl'
import { CheerTicketUsageRepositoryImpl } from '@infra/cheer-ticket-usage/CheerTicketUsage.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    CheerRankingRepositoryImpl,
    {
      provide: 'CheerRankingRepository',
      useClass: CheerRankingRepositoryImpl
    },

    CheerTicketUsageRepositoryImpl,
    {
      provide: 'CheerTicketUsageRepository',
      useClass: CheerTicketUsageRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    CheerRankingRepositoryImpl,
    {
      provide: 'CheerRankingRepository',
      useClass: CheerRankingRepositoryImpl
    },

    CheerTicketUsageRepositoryImpl,
    {
      provide: 'CheerTicketUsageRepository',
      useClass: CheerTicketUsageRepositoryImpl
    }
  ]
})
export class CheerTicketUsageInfraModule {}
