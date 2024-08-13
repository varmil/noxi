import { Module } from '@nestjs/common'
import { ChannelsScenario } from '@app/youtube/channels/channels.scenario'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { ChartsScenario } from '@app/youtube/charts/charts.scenario'
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
    VideosService
  ],
  exports: [
    ChartsScenario,
    ChannelsScenario,
    VideosScenario,
    ChannelsService,
    VideosService
  ]
})
export class YoutubeAppModule {}
