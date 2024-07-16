import { Module } from '@nestjs/common'
import {
  SearchChannelsInfraService,
  YoutubeDataApiChannelsInfraService,
  YoutubeDataApiVideosInfraService
} from '@infra/service/youtube-data-api'

@Module({
  imports: [],
  providers: [
    SearchChannelsInfraService,
    YoutubeDataApiVideosInfraService,
    YoutubeDataApiChannelsInfraService
  ],
  exports: [
    SearchChannelsInfraService,
    YoutubeDataApiVideosInfraService,
    YoutubeDataApiChannelsInfraService
  ]
})
export class YoutubeDataApiInfraModule {}
