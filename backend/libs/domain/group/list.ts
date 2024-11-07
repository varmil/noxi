import { GroupString } from '@domain/group'
import {
  HololiveEnglish,
  HololiveIndonesia,
  Hololive,
  Independent,
  IndependentIRL,
  GroupChannels,
  VSPO,
  IdolCorp
} from '@domain/group/channel'
import { ChannelIds } from '@domain/youtube'

export const ChannelsByGroup: Record<GroupString, GroupChannels> = {
  'hololive-english': new HololiveEnglish(),
  'hololive-indonesia': new HololiveIndonesia(),
  hololive: new Hololive(),
  'idol-corp': new IdolCorp(),
  vspo: new VSPO(),
  independent: new Independent(),
  'independent-irl': new IndependentIRL()
}

export const ChannelIdsByGroup: Record<GroupString, ChannelIds> = {
  'hololive-english': new HololiveEnglish().channelIds(),
  'hololive-indonesia': new HololiveIndonesia().channelIds(),
  hololive: new Hololive().channelIds(),
  'idol-corp': new IdolCorp().channelIds(),
  vspo: new VSPO().channelIds(),
  independent: new Independent().channelIds(),
  'independent-irl': new IndependentIRL().channelIds()
}
