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
    id: new ChannelId('UCyLGcqYs7RsBb3L0SJfzGYA'),
    title: '花芽すみれ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCiMG6VdScBabPhJ1ZtaVmbw'),
    title: '花芽なずな',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCgTzsBI0DIRopMylJEDqnog'),
    title: '小雀とと',
    ...DefaultProps
  },
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
    id: new ChannelId('UCnvVG9RbOW3J6Ifqo-zKLiw'),
    title: '兎咲ミミ / Tosaki Mimi',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCF_U2GCKHvDz52jWdizppIA'),
    title: '空澄セナ',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCvUc0m317LWTTPZoBQV479A'),
    title: '橘ひなの / Hinano Tachibana',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCurEA8YoqFwimJcAuSHU0MQ'),
    title: '英リサ.Hanabusa Lisa',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCGWa1dMU_sDCaRQjdabsVgg'),
    title: '如月れん',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCMp55EbT_ZlqiMS3lCj01BQ'),
    title: '神成きゅぴ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCjXBuHmWkieBApgBhDuJMMQ'),
    title: '八雲べに',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCPkKpOHxEDcwmUAnRpIu-Ng'),
    title: '藍沢エマ / Aizawa Ema',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCD5W21JqNMv_tV9nfjvF9sw'),
    title: '紫宮るな',
    ...DefaultProps
  },

  {
    id: new ChannelId('UC8vKBjGY2HVfbW9GAmgikWw'),
    title: '甘結もか / Amayui Moka',
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
