import { CountryCode, LanguageTag } from '@domain/country'
import { GroupChannel } from '@domain/group/channel/group-channel'
import { ChannelId } from '@domain/youtube'

const DefaultProps = {
  group: 'independent-irl',
  country: new CountryCode('GB'),
  defaultLangage: new LanguageTag('en')
}

export const GBList: GroupChannel[] = [
  {
    id: new ChannelId('UC82hr_TycIBi_BvEnWVoGIw'),
    title: 'TheBrokenMachine',
    ...DefaultProps
  }
]
