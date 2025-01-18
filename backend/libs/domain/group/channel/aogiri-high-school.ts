import { CountryCode, LanguageTag } from '@domain/country'
import {
  GroupChannel,
  GroupChannels
} from '@domain/group/channel/group-channel'
import { Gender } from '@domain/lib'
import { ChannelId, ChannelIds } from '@domain/youtube'

const DefaultProps = {
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('ja'),
  gender: Gender.Female
}

const List: GroupChannel[] = [
  {
    id: new ChannelId('UCt7_srJeiw55kTcK7M9ID6g'),
    title: 'たまこ。Ch',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC7wZb5INldbGweowOhBIs8Q'),
    title: '石狩あかり',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCFG6teapZaN6J1oVXl7MYPA'),
    title: '大代真白',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCs-lYkwb-NYKE9_ssTRDK3Q'),
    title: 'ねくろちゃん',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCXXnWssOLdB2jg-4CznteAA'),
    title: 'こまるCh.',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCyY6YeINiwQoA-FnmdQCkug'),
    title: 'ちよみch.',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCFvEuP2EDkvrgJpHI6-pyNw'),
    title: '我部りえる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCAHXqn4nAd2j3LRu1Qyi_JA'),
    title: 'エトラ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCmiYJycZXBGc4s_zjIRUHhQ'),
    title: 'うらめちゃんねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC1sBUU-y9FlHNukwsrR4bmA'),
    title: 'ぷわぷわぽぷら',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCIwHOJn_3QjBTwQ_gNj7WRA'),
    title: '萌実ちゃんねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCxy3KNlLQiN64tikKipnQNg'),
    title: '月赴ゐぶき',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCdi5pj0MDQ-3LFNUFIFmD8w'),
    title: 'うる虎がーる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCXXlhNCp1EPbDQ2pzmmy9aw'),
    title: 'むじなch',
    ...DefaultProps
  }
]

export class AogiriHighSchool implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
