import { Injectable } from '@nestjs/common'
import { PlaylistId, VideoRepository } from '@domain/youtube'
import {
  PlaylistItemsInfraService,
  VideosInfraService
} from '@infra/service/youtube-data-api'

@Injectable()
export class VideoRepositoryImpl implements VideoRepository {
  constructor(
    private readonly playlistItemsInfraService: PlaylistItemsInfraService,
    private readonly videosInfraService: VideosInfraService
  ) {}

  /**
   * find Videos with Data API
   * @param where channel is required
   */
  async findAll({
    hl,
    where: { channel },
    limit
  }: Parameters<VideoRepository['findAll']>[0]) {
    const { items: playlistItems } = await this.playlistItemsInfraService.list({
      limit: limit,
      playlistId: new PlaylistId(channel.contentDetails.uploadsPlaylistId)
    })

    const [list] = await Promise.all([
      this.videosInfraService.list({
        hl,
        videoIds: playlistItems.getVideoIds(),
        limit
      })
    ])

    return list
  }
}
