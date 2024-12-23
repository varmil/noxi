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
    id: new ChannelId('UCej9K_bcaQdvDh49RkHYsUw'),
    title: '小鳥谷なの',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC_bxkbJzxRKssMf52wVbssw'),
    title: '尾幌こま',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC9Vq5c7FKEHLstvmSAsogXQ'),
    title: '藍坂しう',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCHt4F3--Hq0sNXP6DEdlSmg'),
    title: 'Miki Hitsugi',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCPm_htRQjzhgFikcO_LTvTA'),
    title: 'Utahime Mochizuki',
    ...DefaultProps,
    country: new CountryCode('US'),
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCo9wBz0FkJwiLeagB8tWXCg'),
    title: 'Victoria Valerie',
    ...DefaultProps,
    country: new CountryCode('US'),
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCchGYP5t5Vz48UVxNOifk-Q'),
    title: 'Miu Akumiya',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UC5UPG3fV3zzuq-JLPw-XdWQ'),
    title: '本阿弥あずさ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCm4QiJHdsgz9PshJkGMSk5w'),
    title: 'ミーニャ・スコット',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCwBmSNUOWnowsju5YG7dT6g'),
    title: '領国つかさ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCVvI7-8tzOVC6HUdgQrqSog'),
    title: '夜炎よる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCkeECSuB4aRbUyQrgR2SJOQ'),
    title: '智念せいら',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCez6PoUm-tuIzHLXiXDGKWg'),
    title: '星屑ぷらね',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCsLdP5LylKUGVQV2lki6kcw'),
    title: '茶々良かな',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCFaGKEDWe9_jOmWMsyatxSw'),
    title: '終末むくろ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCK_lMxHpJFGCGz3gXJgaoQw'),
    title: '雪芽るみ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCNKf15eqoAhxJ6CalqgVSCA'),
    title: 'Elyza . EVE',
    ...DefaultProps,
    country: new CountryCode('US'),
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCjzH42Z3aiRxY6SBP_MeihA'),
    title: 'Bluebell . EVE',
    ...DefaultProps,
    country: new CountryCode('US'),
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCckvfYHqNxF1y9FdXHlE7Dw'),
    title: 'Mischief . EVE',
    ...DefaultProps,
    country: new CountryCode('US'),
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCWD4WUf0UQX4-wY1ouALGuA'),
    title: 'Hysteria . EVE',
    ...DefaultProps,
    country: new CountryCode('US'),
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCdbMJDaiIT4viraMae5v4_g'),
    title: 'Azeria . EVE',
    ...DefaultProps,
    country: new CountryCode('US'),
    defaultLangage: new LanguageTag('en')
  }
]

export class Specialite implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
