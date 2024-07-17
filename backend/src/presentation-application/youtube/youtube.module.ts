import { Module } from '@nestjs/common'
import { ChannelsController } from '@app/youtube/channels.controller'
import { ChannelsService } from '@app/youtube/channels.service'
import { VideosScenario } from '@app/youtube/scenario/videos.scenario'
import { VideosController } from '@app/youtube/videos.controller'
import { VideosService } from '@app/youtube/videos.service'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [YoutubeInfraModule],
  controllers: [ChannelsController, VideosController],
  providers: [VideosScenario, ChannelsService, VideosService]
})
export class YoutubeModule {}
