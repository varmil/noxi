import { GroupString } from '@domain/group'
import { HololiveChannelIds } from '@domain/hololive/hololive'
import { HololiveEnglishChannelIds } from '@domain/hololive/hololive-english'
import { ChannelIds } from '@domain/youtube'

export const ChannelIdsByGroup: Record<GroupString, ChannelIds> = {
  hololive: HololiveChannelIds,
  'hololive-english': HololiveEnglishChannelIds,
  'hololive-indonesia': new ChannelIds([])
}
