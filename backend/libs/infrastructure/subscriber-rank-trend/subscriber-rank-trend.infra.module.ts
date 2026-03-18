import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { SubscriberRankTrendRepositoryImpl } from '@infra/subscriber-rank-trend/SubscriberRankTrend.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    SubscriberRankTrendRepositoryImpl,
    {
      provide: 'SubscriberRankTrendRepository',
      useClass: SubscriberRankTrendRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    SubscriberRankTrendRepositoryImpl,
    {
      provide: 'SubscriberRankTrendRepository',
      useClass: SubscriberRankTrendRepositoryImpl
    }
  ]
})
export class SubscriberRankTrendInfraModule {}
