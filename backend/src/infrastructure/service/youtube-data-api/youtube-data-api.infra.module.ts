import { Module } from '@nestjs/common'
import {
  SearchChannelsInfraService,
  SearchVideosInfraService,
  YoutubeDataApiChannelsInfraService
} from '@infra/service/youtube-data-api'

@Module({
  imports: [],
  providers: [
    SearchChannelsInfraService,
    SearchVideosInfraService,
    YoutubeDataApiChannelsInfraService
  ],
  exports: [
    SearchChannelsInfraService,
    SearchVideosInfraService,
    YoutubeDataApiChannelsInfraService
  ]
})
export class YoutubeDataApiInfraModule {}
