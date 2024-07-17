import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels.service'
import { Q } from '@domain/youtube/search/Q.vo'
import { RegionCode } from '@domain/youtube/search/RegionCode.vo'
import { RelevanceLanguage } from '@domain/youtube/search/RelevanceLanguage.vo'
import {
  SearchChannelsInfraService,
  type Params as SearchChannelsParams
} from '@infra/service/youtube-data-api'
import { YoutubeDataApiChannelsInfraService } from '@infra/service/youtube-data-api/youtube-data-api-channels.infra.service'

const TOTAL_LIMIT = 100
const FETCH_LIMIT = 50
const MIN_N = 3

@Injectable()
export class SaveChannelsBySearchScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly searchInfraService: SearchChannelsInfraService,
    private readonly channelsInfraService: YoutubeDataApiChannelsInfraService
  ) {}

  /**
   * batch
   *
   * こっちはクエリを使う場合、全部舐めたりIｄがわからない場合に用いる
   */
  async execute() {
    const params: SearchChannelsParams = {
      limit: FETCH_LIMIT,
      // q: new Q('ホロライブ'),
      // regionCode: new RegionCode('JP'),
      // relevanceLanguage: new RelevanceLanguage('ja')
      q: new Q('travel vlog english'),
      regionCode: new RegionCode('US'),
      relevanceLanguage: new RelevanceLanguage('en')
    }

    let nextPageToken: string | undefined
    let count = 0

    do {
      nextPageToken = await this.saveChannelsInChunkOf50({
        ...params,
        pageToken: nextPageToken
      })
      count += FETCH_LIMIT
    } while (nextPageToken && count < TOTAL_LIMIT)
  }

  private async saveChannelsInChunkOf50(params: SearchChannelsParams) {
    const { nextPageToken, ids } =
      await this.searchInfraService.getChannelIds(params)

    const channels = await this.channelsInfraService.getChannels({
      where: { channelIds: ids }
    })

    // N本以上投稿してるチャンネルのみ保存
    await Promise.all(
      channels.selectWithAtLeastNVideos(MIN_N).map(async channel => {
        await this.channelsService.save(channel)
      })
    )

    return nextPageToken
  }
}
