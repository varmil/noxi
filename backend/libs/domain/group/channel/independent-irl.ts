import {
  GroupChannel,
  GroupChannels
} from '@domain/group/channel/group-channel'
import { INList, JPList } from '@domain/group/channel/independent-irl/index'
import { ChannelId, ChannelIds } from '@domain/youtube'

export class IndependentIRL implements GroupChannels {
  private static list: GroupChannel[] = [...JPList, ...INList]

  channelIds(): ChannelIds {
    return new ChannelIds(IndependentIRL.list.map(c => c.id))
  }
  findById(id: ChannelId) {
    return IndependentIRL.list.find(c => c.id.equals(id))
  }
}
