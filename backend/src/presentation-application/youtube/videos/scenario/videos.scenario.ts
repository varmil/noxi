import { Injectable } from '@nestjs/common'
import { SearchVideosInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class VideosScenario {
  constructor(
    private readonly searchVideosInfraService: SearchVideosInfraService
  ) {}
}
