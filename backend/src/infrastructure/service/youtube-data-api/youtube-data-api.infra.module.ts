import { Module } from '@nestjs/common'
import {
  SearchChannelsInfraService,
  SearchVideosInfraService,
  ChannelsInfraService
} from '@infra/service/youtube-data-api'

@Module({
  imports: [],
  providers: [
    SearchChannelsInfraService,
    SearchVideosInfraService,
    ChannelsInfraService
  ],
  exports: [
    SearchChannelsInfraService,
    SearchVideosInfraService,
    ChannelsInfraService
  ]
})
export class YoutubeDataApiInfraModule {}
