import { Module } from '@nestjs/common'
import { CloudSchedulersYoutubeController } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.controller'
import { CloudSchedulersYoutubeScenario } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.scenario'
import { ChannelsService } from '@app/youtube/channels.service'
import { VideoAggregationsService } from '@app/youtube/video-aggregation.service'
import { VideosService } from '@app/youtube/videos.service'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [YoutubeInfraModule],
  controllers: [CloudSchedulersYoutubeController],
  providers: [
    CloudSchedulersYoutubeScenario,
    ChannelsService,
    VideosService,
    VideoAggregationsService
  ]
})
export class CloudSchedulersYoutubeModule {}
