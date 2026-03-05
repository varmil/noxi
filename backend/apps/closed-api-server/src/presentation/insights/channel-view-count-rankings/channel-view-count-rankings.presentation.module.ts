import { Module } from '@nestjs/common'
import { ChannelViewCountRankingsController } from '@presentation/insights/channel-view-count-rankings/channel-view-count-rankings.controller'
import { ChannelViewCountRankingsModule } from '@app/channel-view-count-rankings/channel-view-count-rankings.module'

@Module({
  imports: [ChannelViewCountRankingsModule],
  controllers: [ChannelViewCountRankingsController],
  providers: []
})
export class ChannelViewCountRankingsPresentationModule {}
