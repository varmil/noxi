import { Module } from '@nestjs/common'
import { YoutubeDataApiInfrastructureService } from '@infra/service/youtube-data-api/youtube-data-api.infrastructure.service'

@Module({
  imports: [],
  providers: [YoutubeDataApiInfrastructureService],
  exports: [YoutubeDataApiInfrastructureService]
})
export class YoutubeDataApiInfrastructureModule {}
