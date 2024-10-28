import { GroupString } from '@domain/group'
import {
  HololiveEnglish,
  HololiveIndonesia,
  Hololive,
  Independent
} from '@domain/group/channel'
import { ChannelIds } from '@domain/youtube'

export const ChannelIdsByGroup: Record<GroupString, ChannelIds> = {
  'hololive-english': HololiveEnglish.channelIds,
  'hololive-indonesia': HololiveIndonesia.channelIds,
  hololive: Hololive.channelIds,
  independent: Independent.channelIds
}
