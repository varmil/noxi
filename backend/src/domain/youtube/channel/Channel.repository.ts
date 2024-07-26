import { CountryCode } from '@domain/country'
import { Channel, Channels, ChannelId, ChannelSort } from '@domain/youtube/'

export interface ChannelRepository {
  findAll: (args: {
    sort: ChannelSort
    country: CountryCode
    limit: number
  }) => Promise<Channels>
  findById: (id: ChannelId) => Promise<Channel | null>
  save: (args: Channel) => Promise<void>
}
