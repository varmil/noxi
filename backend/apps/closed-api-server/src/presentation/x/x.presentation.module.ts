import { Module } from '@nestjs/common'
import { XConcurrentViewerRankingScenario } from '@presentation/x/x-concurrent-viewer-ranking.scenario'
import { XLast24HoursScenario } from '@presentation/x/x-last-24-hours.scenario'
import { XSubscriberGrowthScenario } from '@presentation/x/x-subscriber-growth.scenario'
import { XSuperChatRankingScenario } from '@presentation/x/x-super-chat-ranking.scenario'
import { XViewCountRankingScenario } from '@presentation/x/x-view-count-ranking.scenario'
import { XController } from '@presentation/x/x.controller'
import { ChannelGrowthRankingsModule } from '@app/channel-growth-rankings/channel-growth-rankings.module'
import { ChannelSupersRankingsModule } from '@app/channel-supers-rankings/channel-supers-rankings.module'
import { StreamsModule } from '@app/streams/streams.module'
import { ChannelViewCountRankingsModule } from '@app/channel-view-count-rankings/channel-view-count-rankings.module'
import { SupersBundlesAppModule } from '@app/supers-bundles/supers-bundles.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [
    ChannelGrowthRankingsModule,
    ChannelSupersRankingsModule,
    ChannelViewCountRankingsModule,
    StreamsModule,
    SupersBundlesAppModule,
    YoutubeAppModule
  ],
  controllers: [XController],
  providers: [
    XConcurrentViewerRankingScenario,
    XLast24HoursScenario,
    XSubscriberGrowthScenario,
    XSuperChatRankingScenario,
    XViewCountRankingScenario
  ]
})
export class XPresentationModule {}
