import {
  GroupChannel,
  GroupChannels
} from '@domain/group/channel/group-channel'
import { JPList, INList } from '@domain/group/channel/independent/index'
import { ChannelId, ChannelIds } from '@domain/youtube'

export class Independent implements GroupChannels {
  private static list: GroupChannel[] = [...JPList, ...INList]

  channelIds(): ChannelIds {
    return new ChannelIds(Independent.list.map(c => c.id))
  }
  findById(id: ChannelId) {
    return Independent.list.find(c => c.id.equals(id))
  }
}
