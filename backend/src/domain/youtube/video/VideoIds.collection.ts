import { Exclude } from 'class-transformer'
import { VideoId } from '@domain/youtube'

export class VideoIds {
  constructor(private readonly list: VideoId[]) {}

  @Exclude()
  get length() {
    return this.list.length
  }

  @Exclude()
  slice = (start?: number, end?: number) =>
    new VideoIds(this.list.slice(start, end))

  @Exclude()
  join = (separator?: string) => this.list.map(e => e.get()).join(separator)

  @Exclude()
  map = <U>(
    callbackfn: (value: VideoId, index: number, array: VideoId[]) => U
  ): U[] => this.list.map(callbackfn)

  @Exclude()
  first = () => this.list[0]

  @Exclude()
  take = (n: number) => new VideoIds(this.list.slice(0, n))
}
