import { Module } from '@nestjs/common'
import { SubscriberRankTrendsModule } from '@app/subscriber-rank-trends/subscriber-rank-trends.module'
import { SubscriberRankTrendsController } from './subscriber-rank-trends.controller'

@Module({
  imports: [SubscriberRankTrendsModule],
  controllers: [SubscriberRankTrendsController]
})
export class SubscriberRankTrendsPresentationModule {}
