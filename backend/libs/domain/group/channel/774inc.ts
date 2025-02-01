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
    id: new ChannelId('UC0Owc36U9lOyi9Gx9Ic-4qg'),
    title: '因幡はねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC2kyQhzGOB-JPgcQX9OMgEw'),
    title: '宗谷いちか',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCYTz3uIgwVY3ZU-IQJS8r3A'),
    title: '島村シャルロット',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCwePpiw1ocZRSNSkpKvVISw'),
    title: '西園寺メアリ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCDh2bWI5EDu7PavqwICkVpA'),
    title: '堰代ミコ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC3EhsuKdEkI99TWZwZgWutg'),
    title: '杏戸ゆげ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCmqrvfLMws-GLGHQcB5dasg'),
    title: '花奏 かのん',
    ...DefaultProps
  },
  {
    id: new ChannelId('UChXm-xAYPfygrbyLo2yCASQ'),
    title: '季咲あんこ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCXp7sNC0F_qkjickvlYkg-Q'),
    title: '風見くく',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCW8WKciBixmaqaGqrlTITRQ'),
    title: '柚原いづみ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC2hc-00y-MSR6eYA4eQ4tjQ'),
    title: '龍ヶ崎リン',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC_WOBIopwUih0rytRnr_1Ag'),
    title: '瀬島るい',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCFsWaTQ7kT76jNNGeGIKNSA'),
    title: '飛良ひかり',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC4PrHgUcAtOoj_LKmUL-uLQ'),
    title: '湖南みあ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCqskJ0nmw-_eweWfsKvbrzQ'),
    title: '月野木ちろる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCkpqb53xiOvOgNYEbNpFSyw'),
    title: '茜音カンナ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCBJ6nejlzes6mm9UruaxQsA'),
    title: '涼海ネモ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCBxw5bdrbKO7E60E4s3KgQg'),
    title: '橙里セイ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC_hjHmi-ODGhHlSzD16p5Pw'),
    title: '家入ポポ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCGyywYAJd2O5Y7yUyr7qBRQ'),
    title: '瑚白ユリ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCRY0-zJ1pV4EiKUSLXCXTAg'),
    title: '狼森メイ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCrt4cTM_sWH0iySLMkwwYLQ'),
    title: '蛇宵ティア',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCW98GVLrx8lG_ddOts3cl4g'),
    title: '天羽衣',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCBhfuPYgo5ALbn6WmTXwHwg'),
    title: '日向ましゅ',
    ...DefaultProps
  }
]

export class NanashiInc implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
