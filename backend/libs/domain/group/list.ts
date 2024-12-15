import { GroupString } from '@domain/group'
import {
  HololiveEnglish,
  HololiveIndonesia,
  Hololive,
  Independent,
  IndependentIRL,
  GroupChannels,
  VSPO,
  NeoPorte,
  Mixstgirls,
  IdolCorp,
  Nijisanji,
  NijisanjiEN
} from '@domain/group/channel'
import { ChannelIds } from '@domain/youtube'

export const ChannelsByGroup: Record<GroupString, GroupChannels> = {
  'hololive-english': new HololiveEnglish(),
  'hololive-indonesia': new HololiveIndonesia(),
  hololive: new Hololive(),
  nijisanji: new Nijisanji(),
  'nijisanji-en': new NijisanjiEN(),
  vspo: new VSPO(),
  'neo-porte': new NeoPorte(),
  mixstgirls: new Mixstgirls(),
  'idol-corp': new IdolCorp(),
  independent: new Independent(),
  'independent-irl': new IndependentIRL()
}

export const ChannelIdsByGroup: Record<GroupString, ChannelIds> = {
  'hololive-english': new HololiveEnglish().channelIds(),
  'hololive-indonesia': new HololiveIndonesia().channelIds(),
  hololive: new Hololive().channelIds(),
  nijisanji: new Nijisanji().channelIds(),
  'nijisanji-en': new NijisanjiEN().channelIds(),
  vspo: new VSPO().channelIds(),
  'neo-porte': new NeoPorte().channelIds(),
  mixstgirls: new Mixstgirls().channelIds(),
  'idol-corp': new IdolCorp().channelIds(),
  independent: new Independent().channelIds(),
  'independent-irl': new IndependentIRL().channelIds()
}
