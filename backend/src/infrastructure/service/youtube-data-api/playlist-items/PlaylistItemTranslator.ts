import { type youtube_v3 } from '@googleapis/youtube'
import { z } from 'zod'
import { PlaylistId, PlaylistItem, VideoId } from '@domain/youtube'
import { ContentDetails } from '@domain/youtube/playlist-item/content-details/ContentDetails'
import { playlistItemAPISchema } from '@infra/service/youtube-data-api/playlist-items/PlaylistItemAPISchema'

export class PlaylistItemTranslator {
  constructor(
    private readonly playlistId: PlaylistId,
    private readonly item: youtube_v3.Schema$PlaylistItem
  ) {}

  translate(): PlaylistItem | undefined {
    const { playlistId, item } = this

    try {
      const { contentDetails } = playlistItemAPISchema.parse(item)
      return new PlaylistItem({
        playlistId,
        contentDetails: new ContentDetails({
          videoId: new VideoId(contentDetails.videoId),
          videoPublishedAt: new Date(contentDetails.videoPublishedAt)
        })
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues)
        return undefined
      } else {
        throw err
      }
    }
  }
}
