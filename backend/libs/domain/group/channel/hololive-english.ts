import { ChannelId, ChannelIds } from '@domain/youtube'

const List = [
  {
    id: new ChannelId('UCL_qhgtOy0dy1Agp8vkySQg'),
    group: 'hololive-english',
    title: 'Mori Calliope Ch. hololive-EN'
  },
  {
    id: new ChannelId('UCHsx4Hqa-1ORjQTh9TYDhww'),
    group: 'hololive-english',
    title: 'Takanashi Kiara Ch. hololive-EN'
  },
  {
    id: new ChannelId('UCMwGHR0BTZuLsmjY_NT5Pwg'),
    group: 'hololive-english',
    title: `Ninomae Ina'nis Ch. hololive-EN`
  },
  {
    id: new ChannelId('UCoSrY_IQQVpmIRZ9Xf-y93g'),
    group: 'hololive-english',
    title: 'Gawr Gura Ch. hololive-EN'
  },
  {
    id: new ChannelId('UCyl1z3jo3XHR1riLFKG5UAg'),
    group: 'hololive-english',
    title: 'Watson Amelia Ch. hololive-EN'
  },
  {
    id: new ChannelId('UC8rcEBzJSleTkf_-agPM20g'),
    group: 'hololive-english',
    title: 'IRyS Ch. hololive-EN'
  },

  {
    id: new ChannelId('UCO_aKKYxn4tvrqPjcTzZ6EQ'),
    group: 'hololive-english',
    title: 'Ceres Fauna Ch. hololive-EN'
  },
  {
    id: new ChannelId('UCmbs8T6MWqUHP1tIQvSgKrg'),
    group: 'hololive-english',
    title: 'Ouro Kronii Ch. hololive-EN'
  },
  {
    id: new ChannelId('UC3n5uGu18FoCy23ggWWp8tA'),
    group: 'hololive-english',
    title: 'Nanashi Mumei Ch. hololive-EN'
  },
  {
    id: new ChannelId('UCgmPnx-EEeOrZSg5Tiw7ZRQ'),
    group: 'hololive-english',
    title: 'Hakos Baelz Ch. hololive-EN'
  },
  {
    id: new ChannelId('UCgnfPPb9JI3e9A4cXHnWbyg'),
    group: 'hololive-english',
    title: 'Shiori Novella Ch. hololive-EN'
  },
  {
    id: new ChannelId('UC9p_lqQ0FEDz327Vgf5JwqA'),
    group: 'hololive-english',
    title: 'Koseki Bijou Ch. hololive-EN'
  },

  {
    id: new ChannelId('UC_sFNM0z0MWm9A6WlKPuMMg'),
    group: 'hololive-english',
    title: 'Nerissa Ravencroft Ch. hololive-EN'
  },
  {
    id: new ChannelId('UCt9H_RpQzhxzlyBxFqrdHqA'),
    group: 'hololive-english',
    title: 'FUWAMOCO Ch. hololive-EN'
  },
  {
    id: new ChannelId('UCW5uhrG1eCBYditmhL0Ykjw'),
    group: 'hololive-english',
    title: 'Elizabeth Rose Bloodflame Ch. hololive-EN'
  },
  {
    id: new ChannelId('UCDHABijvPBnJm7F-KlNME3w'),
    group: 'hololive-english',
    title: 'Gigi Murin Ch. hololive-EN'
  },
  {
    id: new ChannelId('UCvN5h1ShZtc7nly3pezRayg'),
    group: 'hololive-english',
    title: 'Cecilia Immergreen Ch. hololive-EN'
  },
  {
    id: new ChannelId('UCl69AEx4MdqMZH7Jtsm7Tig'),
    group: 'hololive-english',
    title: 'Raora Panthera Ch. hololive-EN'
  }
]

export class HololiveEnglish {
  static get channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
}
