import { Exclude } from 'class-transformer'
import { Video } from '@domain/youtube/video/Video.entity'

export class Videos {
  constructor(private readonly list: Video[]) {}

  @Exclude()
  map = <U>(
    callbackfn: (value: Video, index: number, array: Video[]) => U
  ): U[] => this.list.map(callbackfn)
}
