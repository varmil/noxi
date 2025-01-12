import { CountryCode } from '@domain/country'
import { Group } from '@domain/group'
import { Gender } from '@domain/lib'
import { Channel, Channels, ChannelId, ChannelIds } from '@domain/youtube/'

export interface ChannelRepository {
  findAll: (args: {
    where?: {
      id?: ChannelIds
      group?: Group
      gender?: Gender
      country?: CountryCode
    }
    orderBy?: Partial<
      Record<'publishedAt' | 'subscriberCount' | 'viewCount', 'asc' | 'desc'>
    >[]
    limit?: number
    offset?: number
  }) => Promise<Channels>

  findById: (id: ChannelId) => Promise<Channel | null>

  save: (args: Channel) => Promise<void>

  bulkSave: (args: {
    data: { channels: Channels; group: Group }
  }) => Promise<void>
}
