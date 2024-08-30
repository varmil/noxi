import { Injectable } from '@nestjs/common'
import {
  SearchVideosInfraService,
  type SearchVideosParams
} from '@infra/service/youtube-data-api'

@Injectable()
export class SearchesScenario {
  constructor(
    private readonly searchVideosInfraService: SearchVideosInfraService
  ) {}

  async searchVideos(params: SearchVideosParams) {
    return await this.searchVideosInfraService.list(params)
  }
}
