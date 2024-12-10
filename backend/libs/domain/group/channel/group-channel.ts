import { CountryCode, LanguageTag } from '@domain/country'
import { Gender } from '@domain/lib/gender/Gender.vo'
import { ChannelId, ChannelIds } from '@domain/youtube/channel'

export interface GroupChannels {
  channelIds: () => ChannelIds
  findById: (id: ChannelId) => GroupChannel | undefined
}

export interface GroupChannel {
  id: ChannelId
  group: string
  title: string
  country: CountryCode
  defaultLangage: LanguageTag
  gender: Gender
}
