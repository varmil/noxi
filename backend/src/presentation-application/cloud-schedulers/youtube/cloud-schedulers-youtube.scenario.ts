import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels.service'
import { VideoAggregationsService } from '@app/youtube/video-aggregation.service'
import { VideosService } from '@app/youtube/videos.service'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'
import { YoutubeDataApiSearchInfraService } from '@infra/service/youtube-data-api/youtube-data-api-search.infra.service'
import { YoutubeDataApiVideosInfraService } from '@infra/service/youtube-data-api/youtube-data-api-videos.infra.service'

const FETCH_LIMIT = 50

@Injectable()
export class CloudSchedulersYoutubeScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly videosService: VideosService,
    private readonly aggregationsService: VideoAggregationsService,
    private readonly searchInfraService: YoutubeDataApiSearchInfraService,
    private readonly videosInfraService: YoutubeDataApiVideosInfraService
  ) {}

  // TODO: N本以上投稿してるチャンネルのみ保存（効率化）
  async saveChannels() {
    const channels = await this.searchInfraService.getChannels({
      limit: FETCH_LIMIT
    })
    await Promise.all(
      channels.map(async channel => {
        await this.channelsService.save(channel)
      })
    )
  }

  //
  /**
   * 毎月（？）呼ぶ想定で５０本だけ取得
   * DBはPrimary Keyが videoId なのでupsertになる
   *
   * NOTE: Channel Category は Video から推測するしかないかも？
   */
  async saveVideos() {
    const channels = await this.channelsService.findAll({
      limit: FETCH_LIMIT
    })

    await Promise.all(
      channels.take(5).map(async channel => {
        const videos = await this.videosInfraService.getVideos(channel.id, {
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
   * 下記のダブルWrite戦略
   * /channel/{channelId}/latestVideoAggregation
   * /videoAggregation/{channelId}/history/{year-month}
   *
   * このシナリオでは「直近の」動画のみを取得してヒストリ更新（差分更新に近い）
   */
  async saveVideoAggregations() {
    const channels = await this.channelsService.findAll({
      limit: FETCH_LIMIT
    })

    await Promise.all(
      channels.take(5).map(async channel => {
        // ここはFirestoreから取得でも可（事前に保存していれば）
        const videos = await this.videosInfraService.getVideos(channel.id, {
          limit: FETCH_LIMIT
        })

        // NOTE: 直近１ヶ月Max50本だけ考慮したもので十分か？
        const aggregation = VideoAggregation.fromVideos(videos)
        await this.aggregationsService.save({
          where: { channelId: channel.id },
          data: aggregation
        })
      })
    )
  }

  // TODO: call /v3/commentThreads

  // TODO: call /v3/channels?channelId=A,B,C...
}
