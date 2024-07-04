import { Module } from '@nestjs/common'
import { YoutubeDataApiSearchInfraService } from '@infra/service/youtube-data-api/youtube-data-api-search.infra.service'

@Module({
  imports: [],
  providers: [YoutubeDataApiSearchInfraService],
  exports: [YoutubeDataApiSearchInfraService]
})
export class YoutubeDataApiInfraModule {}
