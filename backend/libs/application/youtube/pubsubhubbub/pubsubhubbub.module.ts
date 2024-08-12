import { Module } from '@nestjs/common'
import { SubscribeService } from './subscribe.service'

@Module({
  imports: [],
  providers: [SubscribeService],
  exports: [SubscribeService]
})
export class PubsubhubbubModule {}
