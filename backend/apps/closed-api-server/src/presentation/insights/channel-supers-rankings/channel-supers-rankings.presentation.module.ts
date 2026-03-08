import { Module } from '@nestjs/common'
import { ChannelSupersRankingsController } from '@presentation/insights/channel-supers-rankings/channel-supers-rankings.controller'
import { ChannelSupersRankingsModule } from '@app/channel-supers-rankings/channel-supers-rankings.module'

@Module({
  imports: [ChannelSupersRankingsModule],
  controllers: [ChannelSupersRankingsController],
  providers: []
})
export class ChannelSupersRankingsPresentationModule {}
