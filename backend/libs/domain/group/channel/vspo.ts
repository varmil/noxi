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
    id: new ChannelId('UC5LyYg6cCA4yHEYvtUsir3g'),
    title: '一ノ瀬うるは',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCIcAj6WkJ8vZ7DeJVgmeqKw'),
    title: '胡桃のあ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCvUc0m317LWTTPZoBQV479A'),
    title: '橘ひなの / Hinano Tachibana',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC8vKBjGY2HVfbW9GAmgikWw'),
    title: '甘結もか / Amayui Moka',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCnvVG9RbOW3J6Ifqo-zKLiw'),
    title: '兎咲ミミ / Tosaki Mimi',
    ...DefaultProps
  }
]

export class VSPO implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
