import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels.service'
import { VideoAggregationsService } from '@app/youtube/video-aggregation.service'
import { VideosService } from '@app/youtube/videos.service'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'
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
    private readonly videosInfraService: YoutubeDataApiVideosInfraService,
    private readonly channelsInfraService: YoutubeDataApiChannelsInfraService
  ) {}

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
   * TODO: saveChannelsByIds() など名前を変える
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
}
