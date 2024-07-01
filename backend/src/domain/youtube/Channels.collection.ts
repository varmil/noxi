import { Exclude } from 'class-transformer'
import { Channel } from './Channel.entity'

export class Channels {
  constructor(private readonly list: Channel[]) {}

  @Exclude()
  map = <U>(
    callbackfn: (value: Channel, index: number, array: Channel[]) => U
  ): U[] => this.list.map(callbackfn)
}
