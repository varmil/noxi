import { Module } from '@nestjs/common'
import { ChannelsController } from '@presentation/youtube/channels.controller'
import { ChartsController } from '@presentation/youtube/charts.controller'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'
import { PubsubhubbubPresentationModule } from '@presentation/youtube/pubsubhubbub/pubsubhubbub.presentation.module'
import { StreamsPresentationModule } from '@presentation/youtube/stream/streams.presentation.module'
import { VideosController } from '@presentation/youtube/videos.controller'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [
    PubsubhubbubPresentationModule,
    StreamsPresentationModule,
    YoutubeAppModule
  ],
  controllers: [ChartsController, ChannelsController, VideosController],
  providers: [CryptoService]
})
export class YoutubePresentationModule {}
