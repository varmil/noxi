import { Module } from '@nestjs/common'
import { ChannelSupersRankingsService } from '@app/channel-supers-rankings/channel-supers-rankings.service'
import { ChannelSupersRankingInfraModule } from '@infra/channel-supers-ranking/channel-supers-ranking.infra.module'

@Module({
  imports: [ChannelSupersRankingInfraModule],
  providers: [ChannelSupersRankingsService],
  exports: [ChannelSupersRankingInfraModule, ChannelSupersRankingsService]
})
export class ChannelSupersRankingsModule {}
