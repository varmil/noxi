import { Module } from '@nestjs/common'
import { ChannelsController } from '@presentation/youtube/channels/channels.controller'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [YoutubeAppModule],
  controllers: [ChannelsController],
  providers: []
})
export class ChannelsPresentationModule {}
