import { Module } from '@nestjs/common'
import {
  CloudSchedulersYoutubeController,
  CloudSchedulersYoutubeScenario,
  SaveChannelsBySearchScenario
} from '@app/cloud-schedulers/youtube'
import { ChannelsService } from '@app/youtube/channels.service'
import { VideoAggregationsService } from '@app/youtube/video-aggregation.service'
import { VideosService } from '@app/youtube/videos.service'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [YoutubeInfraModule],
  controllers: [CloudSchedulersYoutubeController],
  providers: [
    CloudSchedulersYoutubeScenario,
    SaveChannelsBySearchScenario,
    ChannelsService,
    VideosService,
    VideoAggregationsService
  ]
})
export class CloudSchedulersYoutubeModule {}
