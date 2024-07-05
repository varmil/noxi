import { Module } from '@nestjs/common'
import { YoutubeDataApiSearchInfraService } from '@infra/service/youtube-data-api/youtube-data-api-search.infra.service'
import { YoutubeDataApiVideosInfraService } from '@infra/service/youtube-data-api/youtube-data-api-videos.infra.service'

@Module({
  imports: [],
  providers: [
    YoutubeDataApiSearchInfraService,
    YoutubeDataApiVideosInfraService
  ],
  exports: [YoutubeDataApiSearchInfraService, YoutubeDataApiVideosInfraService]
})
export class YoutubeDataApiInfraModule {}
