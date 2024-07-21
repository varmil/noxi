import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { VideoAggregationsService } from '@app/youtube/video-aggregation.service'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { ChannelId, Videos, PlaylistId } from '@domain/youtube'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'
import { PlaylistItemsInfraService } from '@infra/service/youtube-data-api'
import { VideosInfraService } from '@infra/service/youtube-data-api/videos/videos.infra.service'

const CHANNEL_FETCH_LIMIT = 50
const VIDEO_FETCH_LIMIT = 50
const TAKE = 15

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
   * このシナリオでは直近１ヶ月Max50本だけを取得してヒストリ更新（差分更新に近い）
   */
  async execute() {
    const channelIds = await this.channelsService.findIds({
      limit: CHANNEL_FETCH_LIMIT
    })

    await Promise.all(
      channelIds.take(TAKE).map(async channelId => {
        const { items } = await this.getVideosInChannel({
          where: { channelId },
          limit: VIDEO_FETCH_LIMIT
        })

        // TODO: daily, weekly, monthly それぞれで集計する
        const aggregation = VideoAggregation.fromVideos(items)

        await this.aggregationsService.save({
          where: { channelId },
          data: aggregation
        })
      })
    )
  }

  private async getVideosInChannel({
    where,
    limit
  }: {
    where: { channelId: ChannelId }
    limit: number
  }): Promise<PaginationResponse<Videos>> {
    const { channelId } = where

    // NOTE: select で `contentDetails` だけ取るとか最適化
    const channel = await this.channelsService.findById(channelId)
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
