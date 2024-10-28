import { ChannelId, ChannelIds } from '@domain/youtube'

const List = [
  {
    id: new ChannelId('UCOyYb1c43VlX9rc_lT6NKQw'),
    group: 'hololive-indonesia',
    title: 'Ayunda Risu Ch. hololive-ID'
  },
  {
    id: new ChannelId('UCP0BspO_AMEe3aQqqpo89Dg'),
    group: 'hololive-indonesia',
    title: 'Moona Hoshinova hololive-ID'
  },
  {
    id: new ChannelId('UCAoy6rzhSf4ydcYjJw3WoVg'),
    group: 'hololive-indonesia',
    title: `Airani Iofifteen Channel hololive-ID`
  },
  {
    id: new ChannelId('UCYz_5n-uDuChHtLo7My1HnQ'),
    group: 'hololive-indonesia',
    title: 'Kureiji Ollie Ch. hololive-ID'
  },
  {
    id: new ChannelId('UC727SQYUvx5pDDGQpTICNWg'),
    group: 'hololive-indonesia',
    title: 'Anya Melfissa Ch. hololive-ID'
  },
  {
    id: new ChannelId('UChgTyjG-pdNvxxhdsXfHQ5Q'),
    group: 'hololive-indonesia',
    title: 'Pavolia Reine Ch. hololive-ID'
  },

  {
    id: new ChannelId('UCTvHWSfBZgtxE4sILOaurIQ'),
    group: 'hololive-indonesia',
    title: 'Vestia Zeta Ch. hololive-ID'
  },
  {
    id: new ChannelId('UCZLZ8Jjx_RN2CXloOmgTHVg'),
    group: 'hololive-indonesia',
    title: 'Kaela Kovalskia Ch. hololive-ID'
  },
  {
    id: new ChannelId('UCjLEmnpCNeisMxy134KPwWw'),
    group: 'hololive-indonesia',
    title: 'Kobo Kanaeru Ch. hololive-ID'
  }
]

export class HololiveIndonesia {
  static get channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
}
