import { Module } from '@nestjs/common'
import { ChannelGrowthRankingsController } from '@presentation/insights/channel-growth-rankings/channel-growth-rankings.controller'
import { ChannelGrowthRankingsModule } from '@app/channel-growth-rankings/channel-growth-rankings.module'

@Module({
  imports: [ChannelGrowthRankingsModule],
  controllers: [ChannelGrowthRankingsController],
  providers: []
})
export class ChannelGrowthRankingsPresentationModule {}
