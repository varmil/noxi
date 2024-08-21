import { Module } from '@nestjs/common'
import { ChannelsScenario } from '@app/youtube/channels/channels.scenario'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { ChartsScenario } from '@app/youtube/charts/charts.scenario'
import { StreamStatsService } from '@app/youtube/stream-stats/stream-stats.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { VideosScenario } from '@app/youtube/videos/scenario/videos.scenario'
import { VideosService } from '@app/youtube/videos/videos.service'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [YoutubeInfraModule],
  controllers: [],
  providers: [
    ChartsScenario,
    ChannelsScenario,
    VideosScenario,
    ChannelsService,
    StreamsService,
    StreamStatsService,
    VideosService
  ],
  exports: [
    ChartsScenario,
    ChannelsScenario,
    VideosScenario,
    ChannelsService,
    StreamsService,
    StreamStatsService,
    VideosService
  ]
})
export class YoutubeAppModule {}
