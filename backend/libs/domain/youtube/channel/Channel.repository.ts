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
  findAll: (args: {
    where?: { id?: ChannelIds; group?: Group; country?: CountryCode }
    sort?: ChannelSort
    limit: number
    offset?: number
  }) => Promise<Channels>

  prismaFindById: (id: ChannelId) => Promise<Channel | null>

  save: (args: Channel) => Promise<void>

  bulkSave: (args: {
    data: { channels: Channels; group: Group }
  }) => Promise<void>
}
