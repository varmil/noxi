import { Module } from '@nestjs/common'
import { XLast24HoursScenario } from '@presentation/x/x-last-24-hours.scenario'
import { XSubscriberGrowthScenario } from '@presentation/x/x-subscriber-growth.scenario'
import { XSuperChatRankingScenario } from '@presentation/x/x-super-chat-ranking.scenario'
import { XViewCountRankingScenario } from '@presentation/x/x-view-count-ranking.scenario'
import { XController } from '@presentation/x/x.controller'
import { ChannelGrowthRankingsModule } from '@app/channel-growth-rankings/channel-growth-rankings.module'
import { ChannelSupersRankingsModule } from '@app/channel-supers-rankings/channel-supers-rankings.module'
import { ChannelViewCountRankingsModule } from '@app/channel-view-count-rankings/channel-view-count-rankings.module'
import { SupersBundlesAppModule } from '@app/supers-bundles/supers-bundles.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [
    ChannelGrowthRankingsModule,
    ChannelSupersRankingsModule,
    ChannelViewCountRankingsModule,
    SupersBundlesAppModule,
    YoutubeAppModule
  ],
  controllers: [XController],
  providers: [
    XLast24HoursScenario,
    XSubscriberGrowthScenario,
    XSuperChatRankingScenario,
    XViewCountRankingScenario
  ]
})
export class XPresentationModule {}
