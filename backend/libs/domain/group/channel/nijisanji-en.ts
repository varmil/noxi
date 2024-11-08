import { CountryCode, LanguageTag } from '@domain/country'
import {
  GroupChannel,
  GroupChannels
} from '@domain/group/channel/group-channel'
import { ChannelId, ChannelIds } from '@domain/youtube'

const DefaultProps = {
  group: 'nijisanji-en',
  country: new CountryCode('US'),
  defaultLangage: new LanguageTag('en')
}

const List: GroupChannel[] = [
  {
    id: new ChannelId('UC-JSeFfovhNsEhftt1WHMvg'),
    title: 'NIJISANJI EN Official',
    ...DefaultProps,
    country: new CountryCode('JP')
  },
  {
    id: new ChannelId('UCckdfYDGrjojJM28n5SHYrA'),
    title: 'Vox Akuma【NIJISANJI EN】',
    ...DefaultProps,
    country: new CountryCode('GB')
  },
  {
    id: new ChannelId('UC7Gb7Uawe20QyFibhLl1lzA'),
    title: 'Luca Kaneshiro【NIJISANJI EN】',
    ...DefaultProps,
    country: new CountryCode('AU')
  },
  {
    id: new ChannelId('UC4yNIKGvy-YUrwYupVdLDXA'),
    title: 'Ike Eveland【NIJISANJI EN】',
    ...DefaultProps,
    country: new CountryCode('SE')
  },
  {
    id: new ChannelId('UCG0rzBZV_QMP4MtWg6IjhEA'),
    title: 'Shu Yamino【NIJISANJI EN】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCQ1zGxHrfEmmW4CPpBx9-qw'),
    title: 'Alban Knox 【NIJISANJI EN】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCR6qhsLpn62WVxCBK1dkLow'),
    title: 'Enna Alouette【NIJISANJI EN】',
    ...DefaultProps,
    country: new CountryCode('CA')
  },
  {
    id: new ChannelId('UChJ5FTsHOu72_5OVx0rvsvQ'),
    title: 'EUki Violeta 【NIJISANJI EN】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCIeSUTOTkF9Hs7q3SGcO-Ow'),
    title: 'Elira Pendora 【NIJISANJI EN】',
    ...DefaultProps,
    country: new CountryCode('CA')
  }
]

export class NijisanjiEN implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
