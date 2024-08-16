import { Module } from '@nestjs/common'
import { ChannelsPresentationModule } from '@presentation/youtube/channels/channels.presentation.module'
import { ChartsController } from '@presentation/youtube/charts.controller'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'
import { PubsubhubbubPresentationModule } from '@presentation/youtube/pubsubhubbub/pubsubhubbub.presentation.module'
import { StreamsPresentationModule } from '@presentation/youtube/stream/streams.presentation.module'
import { VideosController } from '@presentation/youtube/videos.controller'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [
    ChannelsPresentationModule,
    PubsubhubbubPresentationModule,
    StreamsPresentationModule,
    YoutubeAppModule
  ],
  controllers: [ChartsController, VideosController],
  providers: [CryptoService]
})
export class YoutubePresentationModule {}
