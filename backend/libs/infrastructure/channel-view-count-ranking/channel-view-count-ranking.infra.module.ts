import { Module } from '@nestjs/common'
import { ChannelViewCountRankingRepositoryImpl } from '@infra/channel-view-count-ranking/ChannelViewCountRanking.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    ChannelViewCountRankingRepositoryImpl,
    {
      provide: 'ChannelViewCountRankingRepository',
      useClass: ChannelViewCountRankingRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    ChannelViewCountRankingRepositoryImpl,
    {
      provide: 'ChannelViewCountRankingRepository',
      useClass: ChannelViewCountRankingRepositoryImpl
    }
  ]
})
export class ChannelViewCountRankingInfraModule {}
