import { CountryCode, LanguageTag } from '@domain/country'
import {
  GroupChannel,
  GroupChannels
} from '@domain/group/channel/group-channel'
import { Gender } from '@domain/lib'
import { ChannelId, ChannelIds } from '@domain/youtube/channel'

// 13 talents + 1 official

const ENDefaultProps = {
  country: new CountryCode('US'),
  defaultLangage: new LanguageTag('en'),
  gender: Gender.Female
}

const ESDefaultProps = {
  country: new CountryCode('ES'),
  defaultLangage: new LanguageTag('es'),
  gender: Gender.Female
}

const ENList: GroupChannel[] = [
  {
    id: new ChannelId('UCRMs0dRR4MEnCftyk6l1tvQ'),
    title: 'idol',
    ...ENDefaultProps,
    gender: Gender.Nonbinary
  },
  {
    id: new ChannelId('UCdureux7B_V-xhM7tYImASQ'),
    title: 'Chikafuji Lisa Ch. idol-EN',
    ...ENDefaultProps
  },
  {
    id: new ChannelId('UCUfgKgCxtFs1ZPlyiM3JcTw'),
    title: 'Coni Confetti Ch. idol-EN',
    ...ENDefaultProps
  },
  {
    id: new ChannelId('UCBghUKA_L0na0SeQ6snzMMQ'),
    title: 'Enya Ignis Ch. idol-EN',
    ...ENDefaultProps
  },
  {
    id: new ChannelId('UCC4hjJp_MttwfZcuWc0OpVQ'),
    title: 'Kai Saikota Ch. idol-EN',
    ...ENDefaultProps
  },
  {
    id: new ChannelId('UCBnmfjpmhGxao6v54fIIMUA'),
    title: 'Nikki Rei Ch. idol-EN',
    ...ENDefaultProps,
    country: new CountryCode('IL')
  },
  {
    id: new ChannelId('UCk2k1y-d24nFyVCvyxnAaYA'),
    title: 'Poko Rakun Ch. idol-EN',
    ...ENDefaultProps
  },
  {
    id: new ChannelId('UC9xR7uN0x5a6CH3Uopq7czA'),
    title: 'Roca Rourin Ch. idol-EN',
    ...ENDefaultProps
  },
  {
    id: new ChannelId('UCCA4jJY5PrTfIFJIcbI_NhQ'),
    title: 'Shabel Tonya Ch. idol-EN',
    ...ENDefaultProps
  },
  {
    id: new ChannelId('UCeRQcxnk_XDkUZIsEpZUfQA'),
    title: 'Yena Youngblood Ch. idol-EN',
    ...ENDefaultProps
  }
]

const ESList: GroupChannel[] = [
  {
    id: new ChannelId('UC4R6ddhBJp2bjQHVNxgNQSA'),
    title: 'Akugaki Koa Ch. idol-ES',
    ...ESDefaultProps
  },
  {
    id: new ChannelId('UCuDmUl3WY41FqGI_bUr62PA'),
    title: 'Lalabell Lullaby Ch. idol-ES',
    ...ESDefaultProps
  },
  {
    id: new ChannelId('UC-W-yaVIjqkXoh6dZ6_TcMA'),
    title: 'Ruby Runeheart Ch. idol-ES',
    ...ESDefaultProps
  },
  {
    id: new ChannelId('UCiBMH1d7ew_3bi2A_zZGsmw'),
    title: 'Taiga Toragami Ch. idol-ES',
    ...ESDefaultProps
  }
]

const List = [...ENList, ...ESList]

export class IdolCorp implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
