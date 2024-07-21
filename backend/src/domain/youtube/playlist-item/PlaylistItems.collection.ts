import { Exclude } from 'class-transformer'
import { PlaylistItem } from '@domain/youtube/playlist-item/PlaylistItem.entity'
import { VideoIds } from '@domain/youtube/video'

export class PlaylistItems {
  constructor(private readonly list: PlaylistItem[]) {}

  @Exclude()
  getVideoIds = () =>
    new VideoIds(this.list.map(item => item.contentDetails.videoId))

  @Exclude()
  get length() {
    return this.list.length
  }

  @Exclude()
  map = <U>(
    callbackfn: (value: PlaylistItem, index: number, array: PlaylistItem[]) => U
  ): U[] => this.list.map(callbackfn)

  @Exclude()
  first = () => this.list[0]

  @Exclude()
  take = (n: number) => this.list.slice(0, n)
}
