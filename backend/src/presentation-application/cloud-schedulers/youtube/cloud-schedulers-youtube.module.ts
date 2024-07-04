import { Module } from '@nestjs/common'
import { CloudSchedulersYoutubeController } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.controller'
import { CloudSchedulersYoutubeScenario } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.scenario'
import { ChannelsService } from '@app/youtube/channels.service'
import { ChannelInfraModule } from '@infra/youtube/channel.infra.module'

@Module({
  imports: [ChannelInfraModule],
  controllers: [CloudSchedulersYoutubeController],
  providers: [CloudSchedulersYoutubeScenario, ChannelsService]
})
export class CloudSchedulersYoutubeModule {}
