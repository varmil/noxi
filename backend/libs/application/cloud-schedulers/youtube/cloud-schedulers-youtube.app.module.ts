import { Module } from '@nestjs/common'
import { CloudSchedulersYoutubeScenario } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.scenario'
import { SaveAggregationsByChannelScenario } from '@app/cloud-schedulers/youtube/save-aggregations-by-channel.scenario'
import { SaveChannelsBySearchScenario } from '@app/cloud-schedulers/youtube/save-channels-by-search.scenario'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { CountriesService } from '@app/youtube/countries/countries.service'
import { VideoAggregationsService } from '@app/youtube/video-aggregation.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [YoutubeInfraModule],
  controllers: [],
  providers: [
    CloudSchedulersYoutubeScenario,
    SaveAggregationsByChannelScenario,
    SaveChannelsBySearchScenario,
    ChannelsService,
    CountriesService,
    VideosService,
    VideoAggregationsService
  ],
  exports: [
    CloudSchedulersYoutubeScenario,
    SaveAggregationsByChannelScenario,
    SaveChannelsBySearchScenario
  ]
})
export class CloudSchedulersYoutubeAppModule {}
