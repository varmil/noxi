import { Module } from '@nestjs/common'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { SubscribeService } from './subscribe.service'

@Module({
  imports: [YoutubeAppModule],
  providers: [SubscribeService],
  exports: [SubscribeService]
})
export class PubsubhubbubModule {}
