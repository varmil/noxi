import { PlaylistId } from '@domain/youtube/playlist/PlaylistId'
import { ContentDetails } from '@domain/youtube/playlist-item/content-details/ContentDetails'

export class PlaylistItem {
  public readonly playlistId: PlaylistId
  public readonly contentDetails: ContentDetails

  constructor(args: {
    playlistId: PlaylistId
    contentDetails: ContentDetails
  }) {
    this.playlistId = args.playlistId
    this.contentDetails = args.contentDetails
  }
}
