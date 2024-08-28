import { CountryCode } from '@domain/country'
import { Group } from '@domain/group'
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
    where: { id?: ChannelIds; group?: Group; country?: CountryCode }
    sort?: ChannelSort
    limit: number
  }) => Promise<Channels>

  findIds: (
    args: Parameters<ChannelRepository['findAll']>[0]
  ) => Promise<ChannelIds>

  /** @deprecated use prismaFindById instead */
  findById: (id: ChannelId) => Promise<Channel | null>

  prismaFindById: (id: ChannelId) => Promise<Channel | null>

  save: (args: Channel) => Promise<void>

  bulkSave: (args: Channels) => Promise<void>
}
