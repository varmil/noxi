import { GroupString } from '@domain/group'
import {
  HololiveEnglish,
  HololiveIndonesia,
  Hololive,
  Independent,
  GroupChannels
} from '@domain/group/channel'
import { ChannelIds } from '@domain/youtube'

export const ChannelsByGroup: Record<GroupString, GroupChannels> = {
  'hololive-english': new HololiveEnglish(),
  'hololive-indonesia': new HololiveIndonesia(),
  hololive: new Hololive(),
  independent: new Independent()
}

export const ChannelIdsByGroup: Record<GroupString, ChannelIds> = {
  'hololive-english': new HololiveEnglish().channelIds(),
  'hololive-indonesia': new HololiveIndonesia().channelIds(),
  hololive: new Hololive().channelIds(),
  independent: new Independent().channelIds()
}
