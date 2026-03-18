import { Module } from '@nestjs/common'
import { SubscriberRankTrendInfraModule } from '@infra/subscriber-rank-trend/subscriber-rank-trend.infra.module'
import { SubscriberRankTrendsService } from './subscriber-rank-trends.service'

@Module({
  imports: [SubscriberRankTrendInfraModule],
  providers: [SubscriberRankTrendsService],
  exports: [SubscriberRankTrendInfraModule, SubscriberRankTrendsService]
})
export class SubscriberRankTrendsModule {}
