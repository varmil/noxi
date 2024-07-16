import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels.service'
import { VideoAggregationsService } from '@app/youtube/video-aggregation.service'
import { VideosService } from '@app/youtube/videos.service'
import { Q } from '@domain/youtube/search/Q.vo'
import { RegionCode } from '@domain/youtube/search/RegionCode.vo'
import { RelevanceLanguage } from '@domain/youtube/search/RelevanceLanguage.vo'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'
import {
  SearchChannelsInfraService,
  type Params as SearchChannelsParams
} from '@infra/service/youtube-data-api'
import { YoutubeDataApiChannelsInfraService } from '@infra/service/youtube-data-api/youtube-data-api-channels.infra.service'
import { YoutubeDataApiVideosInfraService } from '@infra/service/youtube-data-api/youtube-data-api-videos.infra.service'

const TOTAL_LIMIT = 100
const FETCH_LIMIT = 50
const TAKE = 20
const MIN_N = 3

@Injectable()
export class CloudSchedulersYoutubeScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly videosService: VideosService,
    private readonly aggregationsService: VideoAggregationsService,
    private readonly searchInfraService: SearchChannelsInfraService,
    private readonly videosInfraService: YoutubeDataApiVideosInfraService,
    private readonly channelsInfraService: YoutubeDataApiChannelsInfraService
  ) {}

  /**
   * batch
   *
   * こっちはクエリを使う場合、全部舐めたりIｄがわからない場合に用いる
   */
  async saveChannelBasicInfos() {
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

  /**
   * deleteme (instead, use AggregationByKeyword)
   *
   * 毎月（？）呼ぶ想定で５０本だけ取得
   * DBはPrimary Keyが videoId なのでupsertになる
   *
   * NOTE: Channel Category は Video から推測するしかないかも？
   */
  async saveVideos() {
    const channelIds = await this.channelsService.findIds({
      limit: FETCH_LIMIT
    })

    await Promise.all(
      channelIds.take(TAKE).map(async channelId => {
        const videos = await this.videosInfraService.getVideos(channelId, {
          limit: FETCH_LIMIT
        })

        await Promise.all(
          videos.map(async video => {
            await this.videosService.save(video)
          })
        )
      })
    )
  }

  /**
   * batch
   *
   * 下記のダブルWrite戦略
   * /channel/{channelId}/latestVideoAggregation
   * /videoAggregation/{channelId}/history/{year-month}
   *
   * このシナリオでは「直近の」動画のみを取得してヒストリ更新（差分更新に近い）
   */
  async saveVideoAggregations() {
    const channelIds = await this.channelsService.findIds({
      limit: FETCH_LIMIT
    })

    await Promise.all(
      channelIds.take(TAKE).map(async channelId => {
        // TODO: （直近）１ヶ月間をデフォルト集計挙動にする場合、ここでpublishedAtなどで絞り込み
        // search-videosを使ってクエリする
        const videos = await this.videosInfraService.getVideos(channelId, {
          limit: FETCH_LIMIT
        })

        // NOTE: 直近１ヶ月Max50本だけ考慮したもので十分か？
        const aggregation = VideoAggregation.fromVideos(videos)
        await this.aggregationsService.save({
          where: { channelId },
          data: aggregation
        })
      })
    )
  }

  /**
   * ondemand, batch
   *
   * ondemand
   * このシナリオをオンデマンドの「単一CH」更新でも使う
   * usecase: ユーザーがヒカキンのチャンネルページを開いた際に更新リクエストを送る
   *          GET /v3/channels?channelId=XXX
   *
   *
   * batch
   * こっちはTOP10,000のチャンネル更新、などIdがわかってる場合の更新に用いる
   * GET /v3/channels?channelId=A,B,C...
   */
  async saveChannels() {
    const channelIds = await this.channelsService.findIds({
      limit: FETCH_LIMIT
    })

    const channels = await this.channelsInfraService.getChannels({
      where: { channelIds }
    })

    await Promise.all(
      channels.map(async channel => {
        await this.channelsService.save(channel)
      })
    )
  }
}
