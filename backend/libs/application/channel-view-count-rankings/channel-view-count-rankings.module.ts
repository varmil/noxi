import { Module } from '@nestjs/common'
import { ChannelViewCountRankingsService } from '@app/channel-view-count-rankings/channel-view-count-rankings.service'
import { ChannelViewCountRankingInfraModule } from '@infra/channel-view-count-ranking/channel-view-count-ranking.infra.module'

@Module({
  imports: [ChannelViewCountRankingInfraModule],
  providers: [ChannelViewCountRankingsService],
  exports: [ChannelViewCountRankingInfraModule, ChannelViewCountRankingsService]
})
export class ChannelViewCountRankingsModule {}
