import { Module } from '@nestjs/common'
import { ChannelsController } from '@app/youtube/channels.controller'
import { ChannelsService } from '@app/youtube/channels.service'
import { ChannelInfraModule } from '@infra/youtube/channel.infra.module'

@Module({
  imports: [ChannelInfraModule],
  controllers: [ChannelsController],
  providers: [ChannelsService]
})
export class YoutubeModule {}
