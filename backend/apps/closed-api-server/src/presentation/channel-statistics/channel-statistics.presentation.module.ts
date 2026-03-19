import { Module } from '@nestjs/common'
import { ChannelStatisticsAppModule } from '@app/channel-statistics/channel-statistics.app.module'
import { ChannelStatisticsController } from './channel-statistics.controller'

@Module({
  imports: [ChannelStatisticsAppModule],
  controllers: [ChannelStatisticsController]
})
export class ChannelStatisticsPresentationModule {}
