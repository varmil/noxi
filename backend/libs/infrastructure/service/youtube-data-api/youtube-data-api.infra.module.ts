import { Module } from '@nestjs/common'
import {
  SearchChannelsInfraService,
  SearchVideosInfraService,
  ChannelsInfraService,
  PlaylistItemsInfraService,
  LiveChatMessagesInfraService
} from '@infra/service/youtube-data-api'
import { VideosInfraService } from '@infra/service/youtube-data-api/videos/videos.infra.service'

@Module({
  imports: [],
  providers: [
    LiveChatMessagesInfraService,
    PlaylistItemsInfraService,
    SearchChannelsInfraService,
    SearchVideosInfraService,
    ChannelsInfraService,
    VideosInfraService
  ],
  exports: [
    LiveChatMessagesInfraService,
    PlaylistItemsInfraService,
    SearchChannelsInfraService,
    SearchVideosInfraService,
    ChannelsInfraService,
    VideosInfraService
  ]
})
export class YoutubeDataApiInfraModule {}
