import { CountryCode, LanguageTag } from '@domain/country'
import {
  GroupChannel,
  GroupChannels
} from '@domain/group/channel/group-channel'
import { ChannelId, ChannelIds } from '@domain/youtube'

const DefaultProps = {
  group: 'nijisanji',
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('ja')
}

const List: GroupChannel[] = [
  {
    id: new ChannelId('UCSFCh5NL4qXrAy9u-u2lX3g'),
    title: 'Kuzuha Channel',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCmovZ2th3Sqpd00F5RdeigQ'),
    title: '加賀美 ハヤト/Hayato Kagami',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCmZ1Rbthn-6Jm_qOGjYsh5A'),
    title: 'イブラヒム【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCJubINhCcFXlsBwnHp0wl_g'),
    title: '舞元啓介',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCXW4MqCQn-jCaxlX-nn-BYg'),
    title: '長尾 景 / Nagao Kei【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC7_MFM9b8hp5kuTSpa8WyOQ'),
    title: '栞葉るり / Shioriha Ruri【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCYKP16oMX9KKPbrNgo_Kgag'),
    title: 'える / Elu【にじさんじ】',
    ...DefaultProps
  }
]

export class Nijisanji implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
