import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { ChannelId, PlaylistId, Videos } from '@domain/youtube'
import { PlaylistItemsInfraService } from '@infra/service/youtube-data-api'
import { VideosInfraService } from '@infra/service/youtube-data-api/videos/videos.infra.service'

@Injectable()
export class ChannelsScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly playlistItemsInfraService: PlaylistItemsInfraService,
    private readonly videosInfraService: VideosInfraService
  ) {}

  async getVideosInChannel({
    where
  }: {
    where: { channelId: ChannelId }
  }): Promise<PaginationResponse<Videos>> {
    const { channelId } = where

    const channel = await this.channelsService.findById(channelId)
    if (!channel) return { items: new Videos([]) }

    const { items: playlistItems } = await this.playlistItemsInfraService.list({
      limit: 36,
      playlistId: new PlaylistId(channel.contentDetails.uploadsPlaylistId)
    })

    const videos = await this.videosInfraService.list({
      where: { videoIds: playlistItems.getVideoIds() }
    })

    return { nextPageToken: undefined, items: videos }
  }
}
