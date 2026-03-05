import { Module } from '@nestjs/common'
import { XLast24HoursScenario } from '@presentation/x/x-last-24-hours.scenario'
import { XMonthlyScenario } from '@presentation/x/x-monthly.scenario'
import { XSubscriberGrowthScenario } from '@presentation/x/x-subscriber-growth.scenario'
import { XViewCountRankingScenario } from '@presentation/x/x-view-count-ranking.scenario'
import { XWeeklyScenario } from '@presentation/x/x-weekly.scenario'
import { XController } from '@presentation/x/x.controller'
import { ChannelGrowthRankingsModule } from '@app/channel-growth-rankings/channel-growth-rankings.module'
import { ChannelViewCountRankingsModule } from '@app/channel-view-count-rankings/channel-view-count-rankings.module'
import { SupersBundlesAppModule } from '@app/supers-bundles/supers-bundles.module'
import { SupersSnapshotsAppModule } from '@app/supers-snapshots/supers-snapshots.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [
    ChannelGrowthRankingsModule,
    ChannelViewCountRankingsModule,
    SupersBundlesAppModule,
    SupersSnapshotsAppModule,
    YoutubeAppModule
  ],
  controllers: [XController],
  providers: [
    XLast24HoursScenario,
    XWeeklyScenario,
    XMonthlyScenario,
    XSubscriberGrowthScenario,
    XViewCountRankingScenario
  ]
})
export class XPresentationModule {}
