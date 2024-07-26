import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { VideoAggregationsService } from '@app/youtube/video-aggregation.service'
import { CountryCode } from '@domain/country'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import {
  ChannelId,
  Videos,
  PlaylistId,
  ChannelSort,
  Channel
} from '@domain/youtube'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'
import { PlaylistItemsInfraService } from '@infra/service/youtube-data-api'
import { VideosInfraService } from '@infra/service/youtube-data-api/videos/videos.infra.service'

const CHANNEL_FETCH_LIMIT = 100
const VIDEO_FETCH_LIMIT = 50
const TAKE = 100

@Injectable()
export class SaveAggregationsByChannelScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly aggregationsService: VideoAggregationsService,
    private readonly playlistItemsInfraService: PlaylistItemsInfraService,
    private readonly videosInfraService: VideosInfraService
  ) {}

  /**
   * batch
   *
   * 下記のダブルWrite戦略
   * /channel/{channelId}/latestVideoAggregation
   * /videoAggregation/{channelId}/history/{year-month}
   *
   * 直近１ヶ月 x Max50本を取得して更新（差分更新に近い）
   */
  async execute() {
    // TODO: fetch all countries docs from yt:channel

    const channels = await this.channelsService.findAll({
      sort: new ChannelSort(),
      where: { country: new CountryCode('US') },
      limit: CHANNEL_FETCH_LIMIT
    })

    await Promise.all(
      channels.take(TAKE).map(async channel => {
        const { items } = await this.getVideosInChannel({
          where: { channel },
          limit: VIDEO_FETCH_LIMIT
        })

        // TODO: daily, weekly, monthly それぞれで集計する
        const aggregation = VideoAggregation.fromVideos(items)

        await this.aggregationsService.save({
          where: { channelId: new ChannelId(channel.basicInfo.id) },
          data: aggregation
        })
      })
    )
  }

  private async getVideosInChannel({
    where,
    limit
  }: {
    where: { channel: Channel }
    limit: number
  }): Promise<PaginationResponse<Videos>> {
    const { channel } = where
    if (!channel) return { items: new Videos([]) }

    const { items: playlistItems } = await this.playlistItemsInfraService.list({
      limit: limit,
      playlistId: new PlaylistId(channel.contentDetails.uploadsPlaylistId)
    })

    const videos = await this.videosInfraService.list({
      where: { videoIds: playlistItems.getVideoIds() }
    })

    return { nextPageToken: undefined, items: videos }
  }
}
