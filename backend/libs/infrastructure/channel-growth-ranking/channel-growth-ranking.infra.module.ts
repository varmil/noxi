import { Module } from '@nestjs/common'
import { ChannelGrowthRankingRepositoryImpl } from '@infra/channel-growth-ranking/ChannelGrowthRanking.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    ChannelGrowthRankingRepositoryImpl,
    {
      provide: 'ChannelGrowthRankingRepository',
      useClass: ChannelGrowthRankingRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    ChannelGrowthRankingRepositoryImpl,
    {
      provide: 'ChannelGrowthRankingRepository',
      useClass: ChannelGrowthRankingRepositoryImpl
    }
  ]
})
export class ChannelGrowthRankingInfraModule {}
