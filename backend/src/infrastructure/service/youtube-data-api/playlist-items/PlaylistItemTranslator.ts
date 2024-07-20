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
    const item = this.parse()
    if (!item) return undefined

    const { playlistId } = this

    return new PlaylistItem({
      playlistId,
      contentDetails: new ContentDetails({
        videoId: new VideoId(item.contentDetails.videoId),
        videoPublishedAt: new Date(item.contentDetails.videoPublishedAt)
      })
    })
  }

  private parse() {
    try {
      return playlistItemAPISchema.parse(this.item)
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
