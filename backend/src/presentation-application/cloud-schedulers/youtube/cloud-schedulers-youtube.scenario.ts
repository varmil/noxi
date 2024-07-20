import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels.service'
import { VideoAggregationsService } from '@app/youtube/video-aggregation.service'
import { VideosService } from '@app/youtube/videos.service'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'
import {
  ChannelsInfraService,
  SearchVideosInfraService
} from '@infra/service/youtube-data-api'

const FETCH_LIMIT = 50
const TAKE = 5

@Injectable()
export class CloudSchedulersYoutubeScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly videosService: VideosService,
    private readonly aggregationsService: VideoAggregationsService,
    private readonly searchVideosInfraService: SearchVideosInfraService,
    private readonly channelsInfraService: ChannelsInfraService
  ) {}

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
        const { items } = await this.searchVideosInfraService.getVideos({
          channelId,
          limit: FETCH_LIMIT
        })

        // NOTE: 直近１ヶ月Max50本だけ考慮したもので十分か？
        const aggregation = VideoAggregation.fromVideos(items)
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
  async saveChannelsByIds() {
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

  /**
   * batch
   *
   * TODO: Impl
   */
  async saveChannelCategory() {
    const channelIds = await this.channelsService.findIds({
      limit: FETCH_LIMIT
    })

    // await Promise.all(
    //   channelIds.take(TAKE).map(async channelId => {
    //     const { items } = await this.videosInfraService.getVideos({
    //       channelId,
    //       limit: FETCH_LIMIT
    //     })

    //     // reduce videos for categories, then save the category into a channel.
    //   })
    // )
  }
}
