import { Module } from '@nestjs/common'
import { ChannelsPresentationModule } from '@presentation/youtube/channels/channels.presentation.module'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'
import { PubsubhubbubPresentationModule } from '@presentation/youtube/pubsubhubbub/pubsubhubbub.presentation.module'
import { SearchesPresentationModule } from '@presentation/youtube/searches/searches.presentation.module'
import { StreamsPresentationModule } from '@presentation/youtube/stream/streams.presentation.module'
import { StreamStatsPresentationModule } from '@presentation/youtube/stream-stats/stream-stats.presentation.module'
import { StreamVolumeTrendsPresentationModule } from '@presentation/youtube/stream-volume-trends/stream-volume-trends.presentation.module'
import { VideosController } from '@presentation/youtube/videos.controller'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [
    ChannelsPresentationModule,
    PubsubhubbubPresentationModule,
    SearchesPresentationModule,
    StreamsPresentationModule,
    StreamStatsPresentationModule,
    StreamVolumeTrendsPresentationModule,
    YoutubeAppModule
  ],
  controllers: [VideosController],
  providers: [CryptoService]
})
export class YoutubePresentationModule {}
