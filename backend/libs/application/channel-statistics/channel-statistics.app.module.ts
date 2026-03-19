import { Module } from '@nestjs/common'
import { ChannelStatisticsService } from '@app/channel-statistics/channel-statistics.service'
import { ChannelStatisticsInfraModule } from '@infra/channel-statistics/channel-statistics.infra.module'

@Module({
  imports: [ChannelStatisticsInfraModule],
  providers: [ChannelStatisticsService],
  exports: [ChannelStatisticsInfraModule, ChannelStatisticsService]
})
export class ChannelStatisticsAppModule {}
