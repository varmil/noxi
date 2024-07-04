import { Module } from '@nestjs/common'
import { CloudSchedulersYoutubeController } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.controller'
import { CloudSchedulersYoutubeScenario } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.scenario'
import { ChannelInfraModule } from '@infra/youtube/channel.infra.module'

@Module({
  imports: [ChannelInfraModule],
  controllers: [CloudSchedulersYoutubeController],
  providers: [CloudSchedulersYoutubeScenario]
})
export class CloudSchedulersYoutubeModule {}
