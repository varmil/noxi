import { Module } from '@nestjs/common'
import { ChannelStatisticsRepositoryImpl } from '@infra/channel-statistics/ChannelStatistics.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    ChannelStatisticsRepositoryImpl,
    {
      provide: 'ChannelStatisticsRepository',
      useClass: ChannelStatisticsRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    ChannelStatisticsRepositoryImpl,
    {
      provide: 'ChannelStatisticsRepository',
      useClass: ChannelStatisticsRepositoryImpl
    }
  ]
})
export class ChannelStatisticsInfraModule {}
