import { Module } from '@nestjs/common'
import { YoutubeDataApiChannelsInfraService } from '@infra/service/youtube-data-api/youtube-data-api-channels.infra.service'
import { YoutubeDataApiSearchInfraService } from '@infra/service/youtube-data-api/youtube-data-api-search.infra.service'
import { YoutubeDataApiVideosInfraService } from '@infra/service/youtube-data-api/youtube-data-api-videos.infra.service'

@Module({
  imports: [],
  providers: [
    YoutubeDataApiSearchInfraService,
    YoutubeDataApiVideosInfraService,
    YoutubeDataApiChannelsInfraService
  ],
  exports: [
    YoutubeDataApiSearchInfraService,
    YoutubeDataApiVideosInfraService,
    YoutubeDataApiChannelsInfraService
  ]
})
export class YoutubeDataApiInfraModule {}
