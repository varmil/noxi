import { GroupString } from '@domain/group'
import {
  GroupChannels,
  NanashiInc,
  Hololive,
  HololiveEnglish,
  HololiveIndonesia,
  Holostars,
  Nijisanji,
  NijisanjiEN,
  VSPO,
  NeoPorte,
  AogiriHighSchool,
  Specialite,
  Mixstgirls,
  IdolCorp,
  Independent,
  IndependentIRL
} from '@domain/group/channel'
import { KizunaAI } from '@domain/group/channel/kizuna-ai'
import { ChannelIds } from '@domain/youtube'

export const ChannelsByGroup: Record<GroupString, GroupChannels> = {
  '774inc': new NanashiInc(),
  hololive: new Hololive(),
  'hololive-english': new HololiveEnglish(),
  'hololive-indonesia': new HololiveIndonesia(),
  holostars: new Holostars(),
  nijisanji: new Nijisanji(),
  'nijisanji-en': new NijisanjiEN(),
  vspo: new VSPO(),
  'kizuna-ai': new KizunaAI(),
  'neo-porte': new NeoPorte(),
  'aogiri-high-school': new AogiriHighSchool(),
  specialite: new Specialite(),
  mixstgirls: new Mixstgirls(),
  'idol-corp': new IdolCorp(),
  independent: new Independent(),
  'independent-irl': new IndependentIRL()
}

export const ChannelIdsByGroup: Record<GroupString, ChannelIds> = {
  '774inc': new NanashiInc().channelIds(),
  hololive: new Hololive().channelIds(),
  'hololive-english': new HololiveEnglish().channelIds(),
  'hololive-indonesia': new HololiveIndonesia().channelIds(),
  holostars: new Holostars().channelIds(),
  nijisanji: new Nijisanji().channelIds(),
  'nijisanji-en': new NijisanjiEN().channelIds(),
  vspo: new VSPO().channelIds(),
  'kizuna-ai': new KizunaAI().channelIds(),
  'neo-porte': new NeoPorte().channelIds(),
  'aogiri-high-school': new AogiriHighSchool().channelIds(),
  specialite: new Specialite().channelIds(),
  mixstgirls: new Mixstgirls().channelIds(),
  'idol-corp': new IdolCorp().channelIds(),
  independent: new Independent().channelIds(),
  'independent-irl': new IndependentIRL().channelIds()
}
