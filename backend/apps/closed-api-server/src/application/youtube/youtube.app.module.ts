import { Module } from '@nestjs/common'
import { ChannelsScenario } from 'apps/closed-api-server/src/application/youtube/channels/channels.scenario'
import { ChannelsService } from 'apps/closed-api-server/src/application/youtube/channels/channels.service'
import { ChartsScenario } from 'apps/closed-api-server/src/application/youtube/charts/charts.scenario'
import { VideosScenario } from 'apps/closed-api-server/src/application/youtube/videos/scenario/videos.scenario'
import { VideosService } from 'apps/closed-api-server/src/application/youtube/videos/videos.service'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [YoutubeInfraModule],
  controllers: [],
  providers: [
    ChartsScenario,
    ChannelsScenario,
    VideosScenario,
    ChannelsService,
    VideosService
  ],
  exports: [ChartsScenario, ChannelsScenario, VideosScenario, ChannelsService]
})
export class YoutubeAppModule {}
