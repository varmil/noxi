import { Injectable } from '@nestjs/common'
import { Q, RegionCode, RelevanceLanguage } from '@domain/youtube'
import {
  SearchVideosInfraService,
  type SearchVideosParams
} from '@infra/service/youtube-data-api'

@Injectable()
export class VideosScenario {
  constructor(
    private readonly searchVideosInfraService: SearchVideosInfraService
  ) {}

  async findAll(params: SearchVideosParams) {
    const _params: SearchVideosParams = {
      ...params,
      // q: new Q('ホロライブ'),
      // regionCode: new RegionCode('JP'),
      // relevanceLanguage: new RelevanceLanguage('ja')
      q: new Q('travel vlog english'),
      regionCode: new RegionCode('US'),
      relevanceLanguage: new RelevanceLanguage('en')
    }

    return await this.searchVideosInfraService.getVideos(_params)
  }
}
