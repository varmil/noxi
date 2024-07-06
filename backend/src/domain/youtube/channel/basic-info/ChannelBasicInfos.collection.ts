import { Exclude } from 'class-transformer'
import { ChannelBasicInfo } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.entity'

export class ChannelBasicInfos {
  constructor(private readonly list: ChannelBasicInfo[]) {}

  @Exclude()
  map = <U>(
    callbackfn: (
      value: ChannelBasicInfo,
      index: number,
      array: ChannelBasicInfo[]
    ) => U
  ): U[] => this.list.map(callbackfn)

  @Exclude()
  first = () => this.list[0]

  @Exclude()
  take = (n: number) => this.list.slice(0, n)
}
