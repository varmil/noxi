import { Module } from '@nestjs/common'
import { ChannelSupersRankingRepositoryImpl } from '@infra/channel-supers-ranking/ChannelSupersRanking.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    ChannelSupersRankingRepositoryImpl,
    {
      provide: 'ChannelSupersRankingRepository',
      useClass: ChannelSupersRankingRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    ChannelSupersRankingRepositoryImpl,
    {
      provide: 'ChannelSupersRankingRepository',
      useClass: ChannelSupersRankingRepositoryImpl
    }
  ]
})
export class ChannelSupersRankingInfraModule {}
