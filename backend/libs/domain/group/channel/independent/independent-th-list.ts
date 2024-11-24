import { CountryCode, LanguageTag } from '@domain/country'
import { GroupChannel } from '@domain/group/channel/group-channel'
import { Gender } from '@domain/lib'
import { ChannelId } from '@domain/youtube'

const DefaultProps = {
  group: 'independent',
  country: new CountryCode('TH'),
  defaultLangage: new LanguageTag('th'),
  gender: Gender.Female
}

export const THList: GroupChannel[] = [
  {
    id: new ChannelId('UCompe4fS2oUss8CGTuhOSxA'),
    title: 'Gibpuri Ch',
    ...DefaultProps
  }
]
