import { CountryCode, LanguageTag } from '@domain/country'
import {
  GroupChannel,
  GroupChannels
} from '@domain/group/channel/group-channel'
import { Gender } from '@domain/lib'
import { ChannelId, ChannelIds } from '@domain/youtube'

const DefaultProps = {
  group: 'independent',
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('ja'),
  gender: Gender.Female
}

const List: GroupChannel[] = [
  {
    id: new ChannelId('UChLfthKoUV502J7gU9STArg'),
    title: '渋谷ハル',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCIu-aUArYq_H84dBpCAokMA'),
    title: '白雪レイド',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCbBLqA4HRowpj2JuLrkig5w'),
    title: '或世イヌ',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCuk7vapXKckSw6yCGGDspDg'),
    title: '緋月ゆい',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCZmUoMwjyuQ59sk5_7Tx07A'),
    title: '夜絆ニウ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCEy9cYULQrC2cRlVqJPCcSw'),
    title: '水無瀬',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC8hwewh9svh92E1gXvgVazg'),
    title: '天帝フォルテ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCEtUOMEAuAMz8dor89rt2RA'),
    title: '心白てと',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCmpEFsiD67ZOjn2CCJoo1mw'),
    title: '久我レオ',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCZrYHIPsKhYAXqOls2kQQNQ'),
    title: '絲依とい',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCNGMMdEgYIUR6rC44v9aZ8w'),
    title: '瀬尾カザリ',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCEk1_ZVGRiVV-gxHT9wdNMg'),
    title: '幽乃うつろ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCo6mwsozDGMW0UNGowBJGhg'),
    title: '昏昏アリア',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC4Xuz67FNRr69ILv2b7ZRBA'),
    title: '青桐エイト',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCWnQDjlXTLDyYowc3LaHyJQ'),
    title: '柊ツルギ',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCKuwxopq9c3cldzSOo4ceSA'),
    title: '八神ツクモ',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCAHQGIKolfBfoeXXMY79SBA'),
    title: '白那しずく',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCTxoJgb4DzMd7tiM8cvf4PA'),
    title: '麻倉シノ',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC6FprWVXuULaY9mZOcqTe4A'),
    title: '甘音あむ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCElYE3bfzjjmJ9xwjvro9Yw'),
    title: '日裏クロ',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCv3EicDtxObcZZmnFcHvNnw'),
    title: '鬼ヶ谷 テン',
    ...DefaultProps,
    gender: Gender.Male
  }
]

export class NeoPorte implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
