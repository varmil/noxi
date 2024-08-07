import { CountryCode } from '@domain/country'
import {
  Channel,
  Channels,
  ChannelId,
  ChannelSort,
  ChannelIds
} from '@domain/youtube/'

export interface ChannelRepository {
  /** @deprecated use prismaFindAll instead */
  findAll: (args: {
    sort: ChannelSort
    where: { country: CountryCode }
    limit: number
  }) => Promise<Channels>

  prismaFindAll: (args: {
    sort: ChannelSort
    where: { id?: ChannelIds; country?: CountryCode }
    limit: number
  }) => Promise<Channels>

  findIds: (
    args: Parameters<ChannelRepository['findAll']>[0]
  ) => Promise<ChannelIds>

  findById: (id: ChannelId) => Promise<Channel | null>

  save: (args: Channel) => Promise<void>

  bulkSave: (args: Channels) => Promise<void>
}
