import { CountryCode, LanguageTag } from '@domain/country'
import { GroupChannel } from '@domain/group/channel/group-channel'
import { ChannelId } from '@domain/youtube'

const DefaultProps = {
  group: 'independent-irl',
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('ja')
}

export const JPList: GroupChannel[] = [
  {
    id: new ChannelId('UCMi0f6r-fUqdzM7OOqC-yfA'),
    title: '真神ハティ / Hati Magami',
    ...DefaultProps
  }
]
