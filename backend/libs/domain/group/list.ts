import { GroupString } from '@domain/group'
import { HololiveIndonesia } from '@domain/hololive'
import { Hololive } from '@domain/hololive/hololive'
import { HololiveEnglish } from '@domain/hololive/hololive-english'
import { ChannelIds } from '@domain/youtube'

export const ChannelIdsByGroup: Record<GroupString, ChannelIds> = {
  hololive: Hololive.channelIds,
  'hololive-english': HololiveEnglish.channelIds,
  'hololive-indonesia': HololiveIndonesia.channelIds
}
