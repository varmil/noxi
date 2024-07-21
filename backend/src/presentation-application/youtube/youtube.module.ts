import { Module } from '@nestjs/common'
import { ChannelsController } from '@app/youtube/channels/channels.controller'
import { ChannelsScenario } from '@app/youtube/channels/channels.scenario'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { ChartsController } from '@app/youtube/charts/charts.controller'
import { ChartsScenario } from '@app/youtube/charts/charts.scenario'
import { VideosScenario } from '@app/youtube/videos/scenario/videos.scenario'
import { VideosController } from '@app/youtube/videos/videos.controller'
import { VideosService } from '@app/youtube/videos/videos.service'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [YoutubeInfraModule],
  controllers: [ChartsController, ChannelsController, VideosController],
  providers: [
    ChartsScenario,
    ChannelsScenario,
    VideosScenario,
    ChannelsService,
    VideosService
  ]
})
export class YoutubeModule {}
