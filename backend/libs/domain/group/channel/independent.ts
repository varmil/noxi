import { CountryCode, LanguageTag } from '@domain/country'
import {
  GroupChannel,
  GroupChannels
} from '@domain/group/channel/group-channel'
import { ChannelId, ChannelIds } from '@domain/youtube'

const DefaultProps = {
  group: 'independent',
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('ja')
}

const List: GroupChannel[] = [
  {
    id: new ChannelId('UCrV1Hf5r8P148idjoSfrGEQ'),
    title: 'Sakuna Ch. 結城さくな',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCt30jJgChL8qeT9VPadidSw'),
    title: 'しぐれうい',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCkPIfBOLoO0hVPG-tI2YeGg'),
    title: 'Tomari Mari channel / 兎鞠まりちゃんねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCqTGCMjeKOclEEfW8Vs7sXQ'),
    title: 'ガッチマンV',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC7-N7MvN5muVIHqyQx9LFbA'),
    title: 'メイカちゃんねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCotQnZvYn2T-JiJTs8LrAlw'),
    title: 'チョま',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCGV96w_TwvyCDusr_tmcu8A'),
    title: 'Nito Ch. 新兎わい',
    ...DefaultProps
  }
]

export class Independent implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
