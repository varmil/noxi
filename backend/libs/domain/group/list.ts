import { GroupString } from '@domain/group/Group.vo'
import list from '@domain/hololive/list'
import { ChannelId, ChannelIds } from '@domain/youtube'

export const ChannelIdsByGroup: Record<GroupString, ChannelIds> = {
  hololive: new ChannelIds(list.map(e => new ChannelId(e.id))),
  'hololive-english': new ChannelIds([]),
  'hololive-indonesia': new ChannelIds([])
}
