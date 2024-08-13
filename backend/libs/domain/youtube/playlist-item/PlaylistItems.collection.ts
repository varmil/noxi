import { Exclude } from 'class-transformer'
import { Collection } from '@domain/lib/Collection'
import { PlaylistItem } from '@domain/youtube/playlist-item/PlaylistItem.entity'
import { VideoIds } from '@domain/youtube/video'

export class PlaylistItems extends Collection<PlaylistItem> {
  constructor(protected readonly list: PlaylistItem[]) {
    super(list)
  }

  @Exclude()
  getVideoIds = () =>
    new VideoIds(this.list.map(item => item.contentDetails.videoId))
}
