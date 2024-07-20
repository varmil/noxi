import { Exclude } from 'class-transformer'
import { PlaylistItem } from '@domain/youtube/playlist-item/PlaylistItem.entity'

export class PlaylistItems {
  constructor(private readonly list: PlaylistItem[]) {}

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
