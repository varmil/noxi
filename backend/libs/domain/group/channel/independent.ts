import { ChannelId, ChannelIds } from '@domain/youtube'

const List = [
  {
    id: new ChannelId('UCrV1Hf5r8P148idjoSfrGEQ'),
    group: 'independent',
    title: 'Sakuna Ch. 結城さくな'
  },
  {
    id: new ChannelId('UCt30jJgChL8qeT9VPadidSw'),
    group: 'independent',
    title: 'しぐれうい'
  },
  {
    id: new ChannelId('UCkPIfBOLoO0hVPG-tI2YeGg'),
    group: 'independent',
    title: 'Tomari Mari channel / 兎鞠まりちゃんねる'
  },
  {
    id: new ChannelId('UCqTGCMjeKOclEEfW8Vs7sXQ'),
    group: 'independent',
    title: 'ガッチマンV'
  },
  {
    id: new ChannelId('UC7-N7MvN5muVIHqyQx9LFbA'),
    group: 'independent',
    title: 'メイカちゃんねる'
  },
  {
    id: new ChannelId('UCotQnZvYn2T-JiJTs8LrAlw'),
    group: 'independent',
    title: 'チョま'
  },
  {
    id: new ChannelId('UCGV96w_TwvyCDusr_tmcu8A'),
    group: 'independent',
    title: 'Nito Ch. 新兎わい'
  }
]

export class Independent {
  static get channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
}
