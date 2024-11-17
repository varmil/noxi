import { Module } from '@nestjs/common'
import { YoutubeiLiveChatInfraService } from '@infra/service/youtubei/live_chat'

@Module({
  imports: [],
  providers: [YoutubeiLiveChatInfraService],
  exports: [YoutubeiLiveChatInfraService]
})
export class YoutubeiInfraModule {}
