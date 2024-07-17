import { Module } from '@nestjs/common'
import {
  SearchChannelsInfraService,
  SearchVideosInfraService,
  YoutubeDataApiChannelsInfraService,
  YoutubeDataApiVideosInfraService
} from '@infra/service/youtube-data-api'

@Module({
  imports: [],
  providers: [
    SearchChannelsInfraService,
    SearchVideosInfraService,
    YoutubeDataApiVideosInfraService,
    YoutubeDataApiChannelsInfraService
  ],
  exports: [
    SearchChannelsInfraService,
    SearchVideosInfraService,
    YoutubeDataApiVideosInfraService,
    YoutubeDataApiChannelsInfraService
  ]
})
export class YoutubeDataApiInfraModule {}
