import { Module } from '@nestjs/common'
import { ChannelsController } from '@app/youtube/channels.controller'
import { ChannelsService } from '@app/youtube/channels.service'
import { ChannelInfrastructureModule } from '@infra/youtube/channel.infrastructure.module'

@Module({
  imports: [ChannelInfrastructureModule],
  controllers: [ChannelsController],
  providers: [ChannelsService]
})
export class YoutubeModule {}
