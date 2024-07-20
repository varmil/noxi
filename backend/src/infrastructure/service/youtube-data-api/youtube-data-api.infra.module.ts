import { Module } from '@nestjs/common'
import {
  SearchChannelsInfraService,
  SearchVideosInfraService,
  ChannelsInfraService,
  PlaylistItemsInfraService
} from '@infra/service/youtube-data-api'

@Module({
  imports: [],
  providers: [
    PlaylistItemsInfraService,
    SearchChannelsInfraService,
    SearchVideosInfraService,
    ChannelsInfraService
  ],
  exports: [
    PlaylistItemsInfraService,
    SearchChannelsInfraService,
    SearchVideosInfraService,
    ChannelsInfraService
  ]
})
export class YoutubeDataApiInfraModule {}
