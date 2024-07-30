import { Exclude } from 'class-transformer'
import { Video } from '@domain/youtube/video'

export class Videos {
  constructor(private readonly list: Video[]) {}

  @Exclude()
  map = <U>(
    callbackfn: (value: Video, index: number, array: Video[]) => U
  ): U[] => this.list.map(callbackfn)

  @Exclude()
  filter = (
    callbackfn: (value: Video, index: number, array: Video[]) => unknown
  ): Video[] => this.list.filter(callbackfn)

  @Exclude()
  length = () => this.list.length
}
