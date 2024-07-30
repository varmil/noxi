import { Injectable } from '@nestjs/common'
import {
  IsPaidPromotion,
  IsPaidPromotionObject,
  PlaylistId,
  VideoIds,
  VideoRepository
} from '@domain/youtube'
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
    where: { channel },
    limit
  }: Parameters<VideoRepository['findAll']>[0]) {
    const { items: playlistItems } = await this.playlistItemsInfraService.list({
      limit: limit,
      playlistId: new PlaylistId(channel.contentDetails.uploadsPlaylistId)
    })

    const [list, paidPromotionArray] = await Promise.all([
      this.videosInfraService.list({
        videoIds: playlistItems.getVideoIds(),
        limit
      }),
      this.fetchIsPaidPromotion(playlistItems.getVideoIds())
    ])

    // Set isPaidPromotion to each video
    list.items.setIsPaidPromotion(paidPromotionArray)

    return list
  }

  // FIXME: 遅すぎてtimeoutエラーが出まくるので
  // 素直にtitle, descriptionから判定する
  private async fetchIsPaidPromotion(
    videoIds: VideoIds
  ): Promise<IsPaidPromotionObject[]> {
    const result = videoIds.map(async videoId => {
      const res = await fetch(
        `https://www.youtube.com/watch?v=${videoId.get()}`
      )

      if (!res.ok) {
        console.error(`Failed to fetchIsPaidPromotion ${videoId.get()}`)
        result[videoId.get()] = undefined
        return { videoId, isPaidPromotion: undefined }
      }

      // grep `paidContentOverlayRenderer` from HTML
      const isPaidPromotion = (await res.text()).includes(
        'paidContentOverlayRenderer'
      )

      return {
        videoId,
        isPaidPromotion: new IsPaidPromotion(isPaidPromotion)
      }
    })

    return await Promise.all(result)
  }
}
