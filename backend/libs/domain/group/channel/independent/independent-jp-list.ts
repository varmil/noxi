import { CountryCode, LanguageTag } from '@domain/country'
import { GroupChannel } from '@domain/group/channel/group-channel'
import { ChannelId } from '@domain/youtube'

const DefaultProps = {
  group: 'independent',
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('ja')
}

export const JPList: GroupChannel[] = [
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
    id: new ChannelId('UCeLzT-7b2PBcunJplmWtoDg'),
    title: 'Patra Channel / 周防パトラ',
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
  },
  {
    id: new ChannelId('UCa6tqURg-QBi5QObeLl-8Mw'),
    title: 'GAMEゆうな',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC2-hRIDWzqAnTjOxdLDmhCA'),
    title: 'おやつ@ゲームチャンネル',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCFOsYGDAw16cr57cCqdJdVQ'),
    title: 'MKRチャンネル',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCu5OhGQzagQkmJoOOnxnBIg'),
    title: 'ロッコク【動画解説】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC0C6oq3TlGiSlDCei57hY6A'),
    title: '幕末志士チャンネル',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCIdEIHpS0TdkqRkHL5OkLtA'),
    title: 'さなちゃんねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC-PYFlNwRzLcGfMzT4pSl5Q'),
    title: 'コジマ店員のホラーは恐くない',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCH4yRBPH2pDUjPeqomx8CTQ'),
    title: 'てるとくん',
    ...DefaultProps
  }
]
