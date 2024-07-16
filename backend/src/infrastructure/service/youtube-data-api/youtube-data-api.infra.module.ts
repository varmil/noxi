import { Module } from '@nestjs/common'
import { SearchChannelsInfraService } from '@infra/service/youtube-data-api'
import { YoutubeDataApiChannelsInfraService } from '@infra/service/youtube-data-api/youtube-data-api-channels.infra.service'
import { YoutubeDataApiVideosInfraService } from '@infra/service/youtube-data-api/youtube-data-api-videos.infra.service'

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
