import { CountryCode, LanguageTag } from '@domain/country'
import {
  GroupChannel,
  GroupChannels
} from '@domain/group/channel/group-channel'
import { ChannelId, ChannelIds } from '@domain/youtube/channel'

const DefaultProps = {
  group: 'hololive-english',
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('en')
}

const List: GroupChannel[] = [
  {
    id: new ChannelId('UCL_qhgtOy0dy1Agp8vkySQg'),
    title: 'Mori Calliope Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCHsx4Hqa-1ORjQTh9TYDhww'),
    title: 'Takanashi Kiara Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCMwGHR0BTZuLsmjY_NT5Pwg'),
    title: `Ninomae Ina'nis Ch. hololive-EN`,
    ...DefaultProps
  },
  {
    id: new ChannelId('UCoSrY_IQQVpmIRZ9Xf-y93g'),
    title: 'Gawr Gura Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC8rcEBzJSleTkf_-agPM20g'),
    title: 'IRyS Ch. hololive-EN',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCO_aKKYxn4tvrqPjcTzZ6EQ'),
    title: 'Ceres Fauna Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCmbs8T6MWqUHP1tIQvSgKrg'),
    title: 'Ouro Kronii Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC3n5uGu18FoCy23ggWWp8tA'),
    title: 'Nanashi Mumei Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCgmPnx-EEeOrZSg5Tiw7ZRQ'),
    title: 'Hakos Baelz Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCgnfPPb9JI3e9A4cXHnWbyg'),
    title: 'Shiori Novella Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC9p_lqQ0FEDz327Vgf5JwqA'),
    title: 'Koseki Bijou Ch. hololive-EN',
    ...DefaultProps
  },

  {
    id: new ChannelId('UC_sFNM0z0MWm9A6WlKPuMMg'),
    title: 'Nerissa Ravencroft Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCt9H_RpQzhxzlyBxFqrdHqA'),
    title: 'FUWAMOCO Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCW5uhrG1eCBYditmhL0Ykjw'),
    title: 'Elizabeth Rose Bloodflame Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCDHABijvPBnJm7F-KlNME3w'),
    title: 'Gigi Murin Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCvN5h1ShZtc7nly3pezRayg'),
    title: 'Cecilia Immergreen Ch. hololive-EN',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCl69AEx4MdqMZH7Jtsm7Tig'),
    title: 'Raora Panthera Ch. hololive-EN',
    ...DefaultProps
  }
]

export class HololiveEnglish implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
