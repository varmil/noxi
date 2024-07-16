import { Exclude } from 'class-transformer'
import { Channel } from '@domain/youtube/channel/Channel.entity'

export class Channels {
  constructor(private readonly list: Channel[]) {}

  @Exclude()
  get length() {
    return this.list.length
  }

  @Exclude()
  selectWithAtLeastNVideos = (n: number) =>
    new Channels(
      this.list.filter(channel => channel.statistics.videoCount >= n)
    )

  @Exclude()
  map = <U>(
    callbackfn: (value: Channel, index: number, array: Channel[]) => U
  ): U[] => this.list.map(callbackfn)

  @Exclude()
  first = () => this.list[0]

  @Exclude()
  take = (n: number) => this.list.slice(0, n)
}
