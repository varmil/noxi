import { CountryCode } from '@domain/country'
import { Group } from '@domain/group'
import { Channel, Channels, ChannelId, ChannelIds } from '@domain/youtube/'

export interface ChannelRepository {
  findAll: (args: {
    where?: { id?: ChannelIds; group?: Group; country?: CountryCode }
    orderBy?: Partial<Record<'subscriberCount' | 'viewCount', 'asc' | 'desc'>>[]
    limit?: number
    offset?: number
  }) => Promise<Channels>

  prismaFindById: (id: ChannelId) => Promise<Channel | null>

  save: (args: Channel) => Promise<void>

  bulkSave: (args: {
    data: { channels: Channels; group: Group }
  }) => Promise<void>
}
