import { GroupString } from '@domain/group'
import Hololive from '@domain/hololive/hololive'
import HololiveEnglish from '@domain/hololive/hololive-english'
import { ChannelIds } from '@domain/youtube'

export const ChannelIdsByGroup: Record<GroupString, ChannelIds> = {
  hololive: new ChannelIds(Hololive.map(e => e.id)),
  'hololive-english': new ChannelIds(HololiveEnglish.map(e => e.id)),
  'hololive-indonesia': new ChannelIds([])
}
