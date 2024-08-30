import { Module } from '@nestjs/common'
import { ChannelsScenario } from '@app/youtube/channels/channels.scenario'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { SearchesScenario } from '@app/youtube/searches/searches.scenario'
import { StreamStatsService } from '@app/youtube/stream-stats/stream-stats.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { VideosScenario } from '@app/youtube/videos/scenario/videos.scenario'
import { VideosService } from '@app/youtube/videos/videos.service'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [YoutubeInfraModule],
  controllers: [],
  providers: [
    SearchesScenario,
    ChannelsScenario,
    VideosScenario,
    ChannelsService,
    StreamsService,
    StreamStatsService,
    VideosService
  ],
  exports: [
    SearchesScenario,
    ChannelsScenario,
    VideosScenario,
    ChannelsService,
    StreamsService,
    StreamStatsService,
    VideosService
  ]
})
export class YoutubeAppModule {}
