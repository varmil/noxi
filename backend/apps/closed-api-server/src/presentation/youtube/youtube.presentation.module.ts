import { Module } from '@nestjs/common'
import { ChannelsController } from '@presentation/youtube/channels.controller'
import { ChartsController } from '@presentation/youtube/charts.controller'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'
import { PubsubhubbubController } from '@presentation/youtube/pubsubhubbub/pubsubhubbub.controller'
import { VideosController } from '@presentation/youtube/videos.controller'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [YoutubeAppModule],
  controllers: [
    ChartsController,
    ChannelsController,
    PubsubhubbubController,
    VideosController
  ],
  providers: [CryptoService]
})
export class YoutubePresentationModule {}
