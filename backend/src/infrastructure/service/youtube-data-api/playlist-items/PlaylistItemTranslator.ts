import { type youtube_v3 } from '@googleapis/youtube'
import { PlaylistId, PlaylistItem, VideoId } from '@domain/youtube'
import { ContentDetails } from '@domain/youtube/playlist-item/content-details/ContentDetails'
import { playlistItemSchema } from '@infra/service/youtube-data-api/playlist-items/PlaylistItemSchema'

export class PlaylistItemTranslator {
  constructor(
    private readonly playlistId: PlaylistId,
    private readonly item: youtube_v3.Schema$PlaylistItem
  ) {}

  translate(): PlaylistItem | undefined {
    const { playlistId, item } = this

    try {
      const { contentDetails } = playlistItemSchema.parse(item)
      return new PlaylistItem({
        playlistId,
        contentDetails: new ContentDetails({
          videoId: new VideoId(contentDetails.videoId),
          videoPublishedAt: new Date(contentDetails.videoPublishedAt)
        })
      })
    } catch (error) {
      console.info(error)
      return undefined
    }
  }
}
