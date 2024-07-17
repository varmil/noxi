import { Injectable } from '@nestjs/common'
import { Videos, Q, RegionCode, RelevanceLanguage } from '@domain/youtube'
import {
  YoutubeDataApiVideosInfraService,
  type SearchVideosParams
} from '@infra/service/youtube-data-api'

@Injectable()
export class VideosScenario {
  constructor(
    private readonly videosInfraService: YoutubeDataApiVideosInfraService
  ) {}

  async findAll(params: SearchVideosParams): Promise<{
    nextPageToken?: string
    videos: Videos
  }> {
    const _params: SearchVideosParams = {
      ...params,
      // q: new Q('ホロライブ'),
      // regionCode: new RegionCode('JP'),
      // relevanceLanguage: new RelevanceLanguage('ja')
      q: new Q('travel vlog english'),
      regionCode: new RegionCode('US'),
      relevanceLanguage: new RelevanceLanguage('en')
    }

    return await this.videosInfraService.getVideos(_params)
  }
}
