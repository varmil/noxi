import { Module } from '@nestjs/common'
import { ChannelsController } from '@presentation/youtube/channels.controller'
import { ChartsController } from '@presentation/youtube/charts.controller'
import { VideosController } from '@presentation/youtube/videos.controller'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [YoutubeAppModule],
  controllers: [ChartsController, ChannelsController, VideosController],
  providers: []
})
export class YoutubePresentationModule {}
