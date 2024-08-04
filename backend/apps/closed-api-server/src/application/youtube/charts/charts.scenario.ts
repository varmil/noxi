import { Injectable } from '@nestjs/common'
import { ChannelsService } from 'apps/closed-api-server/src/application/youtube/channels/channels.service'
import { CountryCode } from '@domain/country'
import { ChannelRepository, Q, RelevanceLanguage } from '@domain/youtube'
import {
  SearchVideosInfraService,
  type SearchVideosParams
} from '@infra/service/youtube-data-api'

@Injectable()
export class ChartsScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly searchVideosInfraService: SearchVideosInfraService
  ) {}

  /**
   * Videosチャート
   */
  async getChartOfVideos(params: SearchVideosParams) {
    const _params: SearchVideosParams = {
      ...params,
      // q: new Q('ホロライブ'),
      // regionCode: new RegionCode('JP'),
      // relevanceLanguage: new RelevanceLanguage('ja')
      q: new Q('travel vlog english'),
      regionCode: new CountryCode('US'),
      relevanceLanguage: new RelevanceLanguage('en')
    }

    return await this.searchVideosInfraService.list(_params)
  }

  /**
   * Channels チャート
   */
  async getChartOfChannels(args: Parameters<ChannelRepository['findAll']>[0]) {
    return await this.channelsService.findAll(args)
  }
}
