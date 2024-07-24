import { Exclude } from 'class-transformer'
import { ChannelId } from '@domain/youtube'

export class ChannelIds {
  constructor(private readonly list: ChannelId[]) {}

  @Exclude()
  get length() {
    return this.list.length
  }

  @Exclude()
  slice = (start?: number, end?: number) =>
    new ChannelIds(this.list.slice(start, end))

  @Exclude()
  join = (separator?: string) => this.list.map(e => e.get()).join(separator)

  @Exclude()
  map = <U>(
    callbackfn: (value: ChannelId, index: number, array: ChannelId[]) => U
  ): U[] => this.list.map(callbackfn)

  @Exclude()
  first = () => this.list[0]

  @Exclude()
  take = (n: number) =>
    new ChannelIds(this.list.slice(0, Math.min(n, this.list.length)))
}
