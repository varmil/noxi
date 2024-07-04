import { Module } from '@nestjs/common'
import { ChannelsController } from '@app/youtube/channels.controller'
import { ChannelsService } from '@app/youtube/channels.service'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [YoutubeInfraModule],
  controllers: [ChannelsController],
  providers: [ChannelsService]
})
export class YoutubeModule {}
