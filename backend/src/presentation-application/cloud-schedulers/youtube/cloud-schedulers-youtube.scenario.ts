import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels.service'
import { VideoAggregationsService } from '@app/youtube/video-aggregation.service'
import { VideosService } from '@app/youtube/videos.service'
import { Q } from '@domain/youtube/search/Q.vo'
import { RegionCode } from '@domain/youtube/search/RegionCode.vo'
import { RelevanceLanguage } from '@domain/youtube/search/RelevanceLanguage.vo'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'
import { SearchChannelsInfraService } from '@infra/service/youtube-data-api'
import { YoutubeDataApiChannelsInfraService } from '@infra/service/youtube-data-api/youtube-data-api-channels.infra.service'
import { YoutubeDataApiVideosInfraService } from '@infra/service/youtube-data-api/youtube-data-api-videos.infra.service'

const FETCH_LIMIT = 50
const TAKE = 20

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

  // TODO: N本以上投稿してるチャンネルのみ保存（効率化）。すると this.channelsService.save(channel) が呼べるようになる
  // TODO: getChannelBasicInfos should only return "id" (without snippet)
  /**
   * batch
   */
  async saveChannelBasicInfos() {
    const basicInfos = await this.searchInfraService.getChannelBasicInfos({
      limit: FETCH_LIMIT,
      // q: new Q('ホロライブ'),
      // regionCode: new RegionCode('JP'),
      // relevanceLanguage: new RelevanceLanguage('ja')
      q: new Q('travel vlog english'),
      regionCode: new RegionCode('US'),
      relevanceLanguage: new RelevanceLanguage('en')
    })

    // TODO: call this.channelsInfraService.getChannels() to get "videoCount"
    // chunk 50

    await Promise.all(
      basicInfos.map(async basicInfo => {
        await this.channelsService.saveBasicInfo(basicInfo)
      })
    )
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
    const basicInfos = await this.channelsService.findAllBasicInfos({
      limit: FETCH_LIMIT
    })

    await Promise.all(
      basicInfos.take(TAKE).map(async basicInfo => {
        const videos = await this.videosInfraService.getVideos(basicInfo.id, {
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
    const basicInfos = await this.channelsService.findAllBasicInfos({
      limit: FETCH_LIMIT
    })

    await Promise.all(
      basicInfos.take(TAKE).map(async basicInfo => {
        // TODO: （直近）１ヶ月間をデフォルト集計挙動にする場合、ここでpublishedAtなどで絞り込み
        const videos = await this.videosInfraService.getVideos(basicInfo.id, {
          limit: FETCH_LIMIT
        })

        // NOTE: 直近１ヶ月Max50本だけ考慮したもので十分か？
        const aggregation = VideoAggregation.fromVideos(videos)
        await this.aggregationsService.save({
          where: { channelId: basicInfo.id },
          data: aggregation
        })
      })
    )
  }

  /**
   * ondemand
   *
   * FIXME: このシナリオはオンデマンドの「単一CH」更新専用にする
   * usecase: ユーザーがヒカキンのチャンネルページを開いた際に更新リクエストを送る
   *          GET /v3/channels?channelId=XXX
   *
   * GET /v3/channels?channelId=A,B,C...
   */
  async saveChannels() {
    const basicInfos = await this.channelsService.findAllBasicInfos({
      limit: FETCH_LIMIT
    })

    const channels = await this.channelsInfraService.getChannels({
      where: { channelIds: basicInfos.map(i => i.id) }
    })

    await Promise.all(
      channels.map(async channel => {
        await this.channelsService.save(channel)
      })
    )
  }
}
