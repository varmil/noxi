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
    id: new ChannelId('UCi9O6GC9DvnrXqQfgXrNaYg'),
    title: '空奏イト',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCjN-1QSJtD6RdRGXTf9L1Sw'),
    title: '雪白キャル',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCAoKkBp0Qj0xW0NEOp7G4hw'),
    title: '渚沢シチ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCc_r_D9M7BGFpwXZnFaxEww'),
    title: '成海ミャオ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCoqYYjzSW9HZSaJHzSLmApA'),
    title: '天吹サン',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCVAyRbZsu5lrv2_xvgliB2Q'),
    title: '小鈴りあん',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC6BCNzMKS01UZT90lrwA1bw'),
    title: '星乃りむ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC1AqiQjSbkS_b--haYNkLrw'),
    title: '琴宮いおり',
    ...DefaultProps
  }
]

export class Mixstgirls implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
