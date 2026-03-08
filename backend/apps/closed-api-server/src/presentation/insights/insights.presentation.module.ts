import { Module } from '@nestjs/common'
import { ChannelGrowthRankingsPresentationModule } from '@presentation/insights/channel-growth-rankings/channel-growth-rankings.presentation.module'
import { ChannelSupersRankingsPresentationModule } from '@presentation/insights/channel-supers-rankings/channel-supers-rankings.presentation.module'
import { ChannelViewCountRankingsPresentationModule } from '@presentation/insights/channel-view-count-rankings/channel-view-count-rankings.presentation.module'
import { ConcurrentViewerTrendsPresentationModule } from '@presentation/insights/concurrent-viewer-trends/concurrent-viewer-trends.presentation.module'
import { DayOfWeekDistributionsPresentationModule } from '@presentation/insights/day-of-week-distributions/day-of-week-distributions.presentation.module'
import { GoldenTimesPresentationModule } from '@presentation/insights/golden-times/golden-times.presentation.module'
import { StreamVolumeTrendsPresentationModule } from '@presentation/insights/stream-volume-trends/stream-volume-trends.presentation.module'

@Module({
  imports: [
    ChannelGrowthRankingsPresentationModule,
    ChannelSupersRankingsPresentationModule,
    ChannelViewCountRankingsPresentationModule,
    ConcurrentViewerTrendsPresentationModule,
    DayOfWeekDistributionsPresentationModule,
    GoldenTimesPresentationModule,
    StreamVolumeTrendsPresentationModule
  ]
})
export class InsightsPresentationModule {}
