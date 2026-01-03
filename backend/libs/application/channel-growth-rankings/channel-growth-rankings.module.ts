import { Module } from '@nestjs/common'
import { ChannelGrowthRankingsService } from '@app/channel-growth-rankings/channel-growth-rankings.service'
import { ChannelGrowthRankingInfraModule } from '@infra/channel-growth-ranking/channel-growth-ranking.infra.module'

@Module({
  imports: [ChannelGrowthRankingInfraModule],
  providers: [ChannelGrowthRankingsService],
  exports: [ChannelGrowthRankingInfraModule, ChannelGrowthRankingsService]
})
export class ChannelGrowthRankingsModule {}
