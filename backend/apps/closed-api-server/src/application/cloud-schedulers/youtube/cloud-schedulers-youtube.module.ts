import { Module } from '@nestjs/common'
import { CloudSchedulersYoutubeScenario } from 'apps/closed-api-server/src/application/cloud-schedulers/youtube/cloud-schedulers-youtube.scenario'
import { SaveAggregationsByChannelScenario } from 'apps/closed-api-server/src/application/cloud-schedulers/youtube/save-aggregations-by-channel.scenario'
import { SaveChannelsBySearchScenario } from 'apps/closed-api-server/src/application/cloud-schedulers/youtube/save-channels-by-search.scenario'
import { ChannelsService } from 'apps/closed-api-server/src/application/youtube/channels/channels.service'
import { CountriesService } from 'apps/closed-api-server/src/application/youtube/countries/countries.service'
import { VideoAggregationsService } from 'apps/closed-api-server/src/application/youtube/video-aggregation.service'
import { VideosService } from 'apps/closed-api-server/src/application/youtube/videos/videos.service'
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
export class CloudSchedulersYoutubeModule {}
