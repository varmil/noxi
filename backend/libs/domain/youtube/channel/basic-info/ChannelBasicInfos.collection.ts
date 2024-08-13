import { Collection } from '@domain/lib/Collection'
import { ChannelBasicInfo } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.entity'

export class ChannelBasicInfos extends Collection<ChannelBasicInfo> {
  constructor(protected readonly list: ChannelBasicInfo[]) {
    super(list)
  }
}
