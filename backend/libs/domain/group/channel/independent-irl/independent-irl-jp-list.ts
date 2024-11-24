import { CountryCode, LanguageTag } from '@domain/country'
import { GroupChannel } from '@domain/group/channel/group-channel'
import { Gender } from '@domain/lib'
import { ChannelId } from '@domain/youtube'

const DefaultProps = {
  group: 'independent-irl',
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('ja'),
  gender: Gender.Male
}

export const JPList: GroupChannel[] = [
  {
    id: new ChannelId('UCMi0f6r-fUqdzM7OOqC-yfA'),
    title: '真神ハティ / Hati Magami',
    ...DefaultProps,
    gender: Gender.Female
  },
  {
    id: new ChannelId('UCuQ5bzjS-9qV4eBbGJ19qmw'),
    title: 'あまくだり',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCz0aC9z3kXruRHULDqFRuVA'),
    title: 'あっさりしょこ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCdVnOfmhI0sNGdaH5yldztg'),
    title: 'LiaqN【りあん】',
    ...DefaultProps
  }
]
