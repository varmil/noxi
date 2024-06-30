import { Module } from '@nestjs/common'
import { ChannelsController } from '@app/youtube/channels.controller'
import { ChannelsService } from '@app/youtube/channels.service'

@Module({
  imports: [],
  controllers: [ChannelsController],
  providers: [ChannelsService]
})
export class YoutubeModule {}
