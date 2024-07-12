import { Module } from '@nestjs/common'
import { ChannelsController } from '@app/youtube/channels.controller'
import { ChannelsService } from '@app/youtube/channels.service'
import { VideosController } from '@app/youtube/videos.controller'
import { VideosService } from '@app/youtube/videos.service'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [YoutubeInfraModule],
  controllers: [ChannelsController, VideosController],
  providers: [ChannelsService, VideosService]
})
export class YoutubeModule {}
