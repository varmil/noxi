import { CountryCode, LanguageTag } from '@domain/country'
import { GroupChannel } from '@domain/group/channel/group-channel'
import { Gender } from '@domain/lib'
import { ChannelId } from '@domain/youtube'

const DefaultProps = {
  group: 'independent',
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('ja'),
  gender: Gender.Female
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
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC7-N7MvN5muVIHqyQx9LFbA'),
    title: 'メイカちゃんねる',
    ...DefaultProps,
    gender: Gender.Male
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
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCFOsYGDAw16cr57cCqdJdVQ'),
    title: 'MKRチャンネル',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCu5OhGQzagQkmJoOOnxnBIg'),
    title: 'ロッコク【動画解説】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC0C6oq3TlGiSlDCei57hY6A'),
    title: '幕末志士チャンネル',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCIdEIHpS0TdkqRkHL5OkLtA'),
    title: 'さなちゃんねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC-PYFlNwRzLcGfMzT4pSl5Q'),
    title: 'コジマ店員のホラーは恐くない',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCH4yRBPH2pDUjPeqomx8CTQ'),
    title: 'てるとくん',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC_T1YqknD5yrpVlupc-ZXzg'),
    title: 'イル_フローラ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCL7VEatXa9yBCKeM-ww8TnA'),
    title: 'NX☆くさあん',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCcxbWdwrs5B782K88ppAVMg'),
    title: 'なるせ部',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCY7Qs1UGnO3LYpNVwitTXUA'),
    title: '一翔剣ちゃんねる',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC1oApu0S5i57d-jSKUFB_1w'),
    title: 'りちゃむ【Richamu】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC77FLsC_6ZmjhZ7BA5uV_KQ'),
    title: 'くぅch. 沙倉くぅ / Sakura Qoo',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCNbpZM28AR6GXvrUcZ5v0zg'),
    title: '恋白れん / RenKohaku Ch.',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCxm3RjoZHKNbvpiP5RW6Wlg'),
    title: '猫元パト / Patoneko Ch.',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCWOKF8h6kFj2pRn3rCD6nyw'),
    title: 'Pepero ch. / 猫田ぺぺろ',
    ...DefaultProps
  }
]
