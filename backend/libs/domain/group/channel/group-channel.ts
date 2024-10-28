import { CountryCode, LanguageTag } from '@domain/country'
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
}
