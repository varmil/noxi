import { Module } from '@nestjs/common'
import { StreamsModule } from '@app/streams/streams.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { CallbackService } from './callback.service'
import { SubscribeService } from './subscribe.service'

@Module({
  imports: [StreamsModule, YoutubeAppModule],
  providers: [CallbackService, SubscribeService],
  exports: [CallbackService, SubscribeService]
})
export class PubsubhubbubAppModule {}
