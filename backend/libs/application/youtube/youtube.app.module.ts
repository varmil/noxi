import { Module } from '@nestjs/common'
import { ChannelsScenario } from '@app/youtube/channels/channels.scenario'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { SearchesScenario } from '@app/youtube/searches/searches.scenario'
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
    VideosService
  ],
  exports: [
    YoutubeInfraModule,
    SearchesScenario,
    ChannelsScenario,
    VideosScenario,
    ChannelsService,
    VideosService
  ]
})
export class YoutubeAppModule {}
