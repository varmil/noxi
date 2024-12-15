import { CountryCode, LanguageTag } from '@domain/country'
import { GroupChannel } from '@domain/group/channel/group-channel'
import { Gender } from '@domain/lib'
import { ChannelId } from '@domain/youtube'

const DefaultProps = {
  country: new CountryCode('GB'),
  defaultLangage: new LanguageTag('en'),
  gender: Gender.Male
}

export const GBList: GroupChannel[] = [
  {
    id: new ChannelId('UC82hr_TycIBi_BvEnWVoGIw'),
    title: 'TheBrokenMachine',
    ...DefaultProps
  }
]
