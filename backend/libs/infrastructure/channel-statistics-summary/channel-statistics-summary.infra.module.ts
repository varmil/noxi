import { Module } from '@nestjs/common'
import { ChannelStatisticsSummaryRepositoryImpl } from '@infra/channel-statistics-summary/ChannelStatisticsSummary.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    ChannelStatisticsSummaryRepositoryImpl,
    {
      provide: 'ChannelStatisticsSummaryRepository',
      useClass: ChannelStatisticsSummaryRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    ChannelStatisticsSummaryRepositoryImpl,
    {
      provide: 'ChannelStatisticsSummaryRepository',
      useClass: ChannelStatisticsSummaryRepositoryImpl
    }
  ]
})
export class ChannelStatisticsSummaryInfraModule {}
