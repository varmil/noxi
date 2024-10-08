import { Injectable } from '@nestjs/common'
import { PlaylistId, VideoIds, VideoRepository } from '@domain/youtube'
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
  async findByChannel({
    hl,
    where: { channel },
    limit
  }: Parameters<VideoRepository['findByChannel']>[0]) {
    const { items: playlistItems } = await this.playlistItemsInfraService.list({
      limit: limit,
      playlistId: new PlaylistId(channel.contentDetails.uploadsPlaylistId)
    })

    return await this.videosInfraService.list({
      hl,
      videoIds: playlistItems.getVideoIds(),
      limit
    })
  }

  async findById(id: Parameters<VideoRepository['findById']>[0]) {
    // find Video with Data API(VideosInfraService)
    const videos = await this.videosInfraService.list({
      videoIds: new VideoIds([id]),
      limit: 1
    })
    return videos.items.first() ?? null
  }

  async findAll({
    hl,
    where: { ids },
    limit
  }: Parameters<VideoRepository['findAll']>[0]) {
    return await this.videosInfraService.list({
      hl,
      videoIds: ids,
      limit
    })
  }
}
