import { Module } from '@nestjs/common'
import {
  SearchChannelsInfraService,
  SearchVideosInfraService,
  ChannelsInfraService,
  PlaylistItemsInfraService
} from '@infra/service/youtube-data-api'
import { VideosInfraService } from '@infra/service/youtube-data-api/videos/videos.infra.service'

@Module({
  imports: [],
  providers: [
    PlaylistItemsInfraService,
    SearchChannelsInfraService,
    SearchVideosInfraService,
    ChannelsInfraService,
    VideosInfraService
  ],
  exports: [
    PlaylistItemsInfraService,
    SearchChannelsInfraService,
    SearchVideosInfraService,
    ChannelsInfraService,
    VideosInfraService
  ]
})
export class YoutubeDataApiInfraModule {}
