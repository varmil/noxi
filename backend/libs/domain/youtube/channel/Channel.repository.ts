import { CountryCode } from '@domain/country'
import {
  Channel,
  Channels,
  ChannelId,
  ChannelSort,
  ChannelIds
} from '@domain/youtube/'

export interface ChannelRepository {
  findAll: (args: {
    sort: ChannelSort
    where: { country: CountryCode }
    limit: number
  }) => Promise<Channels>

  findIds: (
    args: Parameters<ChannelRepository['findAll']>[0]
  ) => Promise<ChannelIds>

  findById: (id: ChannelId) => Promise<Channel | null>

  save: (args: Channel) => Promise<void>
}
