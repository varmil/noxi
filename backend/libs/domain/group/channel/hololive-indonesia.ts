import { CountryCode, LanguageTag } from '@domain/country'
import {
  GroupChannel,
  GroupChannels
} from '@domain/group/channel/group-channel'
import { Gender } from '@domain/lib'
import { ChannelId, ChannelIds } from '@domain/youtube'

const DefaultProps = {
  group: 'hololive-indonesia',
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('id'),
  gender: Gender.Female
}

const List: GroupChannel[] = [
  {
    id: new ChannelId('UCOyYb1c43VlX9rc_lT6NKQw'),
    title: 'Ayunda Risu Ch. hololive-ID',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCP0BspO_AMEe3aQqqpo89Dg'),
    title: 'Moona Hoshinova hololive-ID',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCAoy6rzhSf4ydcYjJw3WoVg'),
    title: `Airani Iofifteen Channel hololive-ID`,
    ...DefaultProps
  },
  {
    id: new ChannelId('UCYz_5n-uDuChHtLo7My1HnQ'),
    title: 'Kureiji Ollie Ch. hololive-ID',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC727SQYUvx5pDDGQpTICNWg'),
    title: 'Anya Melfissa Ch. hololive-ID',
    ...DefaultProps
  },
  {
    id: new ChannelId('UChgTyjG-pdNvxxhdsXfHQ5Q'),
    title: 'Pavolia Reine Ch. hololive-ID',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCTvHWSfBZgtxE4sILOaurIQ'),
    title: 'Vestia Zeta Ch. hololive-ID',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCZLZ8Jjx_RN2CXloOmgTHVg'),
    title: 'Kaela Kovalskia Ch. hololive-ID',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCjLEmnpCNeisMxy134KPwWw'),
    title: 'Kobo Kanaeru Ch. hololive-ID',
    ...DefaultProps
  }
]

export class HololiveIndonesia implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
