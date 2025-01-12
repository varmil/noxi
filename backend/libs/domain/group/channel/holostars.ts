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
  gender: Gender.Male
}

const List: GroupChannel[] = [
  {
    id: new ChannelId('UC6t3-_N8A6ME1JShZHHqOMw'),
    title: '花咲みやび',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCZgOv3YDEs-ZnZWDYVwJdmA'),
    title: '奏手イヅル',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCKeAhJvy8zgXWbh9duVjIaQ'),
    title: 'アルランディス',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC9mf_ZVpouoILRY9NUIaK-w'),
    title: '律可',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCNVEsYbiZjH5QLmGeSgTSzg'),
    title: 'アステル',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCGNI4MENvnsymYjKiZwv9eg'),
    title: '岸堂天真',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCANDOlYTJT7N5jlRC3zfzVA'),
    title: '夕刻ロベル',
    ...DefaultProps
  },
  {
    id: new ChannelId('UChSvpZYRPh0FvG4SJGSga3g'),
    title: '影山シエン',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCwL7dgTxKo8Y4RFIKWaf8gA'),
    title: '荒咬オウガ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCc88OV45ICgHbn3ZqLLb52w'),
    title: '夜十神封魔',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCgRqGV1gBf2Esxh0Tz1vxzw'),
    title: '羽継烏有',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCdfMHxjcCc2HSd9qFvfJgjg'),
    title: '水無世燐央',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCKeAhJvy8zgXWbh9duVjIaQ'),
    title: 'Regis Altare',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UC2hx0xVkMoHGWijwr_lA01w'),
    title: 'Axel Syrios',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCHP4f7G2dWD4qib7BMatGAw'),
    title: 'Gavis Bettel',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UC060r4zABV18vcahAWR1n7w'),
    title: 'Machina X Flayon',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },

  {
    id: new ChannelId('UC7gxU6NXjKF1LrgOddPzgTw'),
    title: 'Banzoin Hakka',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCMqGG8BRAiI1lJfKOpETM_w'),
    title: 'Josuiji Shinri',
    ...DefaultProps,
    country: new CountryCode('US'),
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCTVSOgYuSWmNAt-lnJPkEEw'),
    title: 'Jurard T Rexford',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCJv02SHZgav7Mv3V0kBOR8Q'),
    title: 'Goldbullet',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },

  {
    id: new ChannelId('UCLk1hcmxg8rJ3Nm1_GvxTRA'),
    title: 'Octavio',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCajbFh6e_R8QZdHAMbbi4rQ'),
    title: 'Crimzon Ruze',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  }
]

export class Holostars implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
