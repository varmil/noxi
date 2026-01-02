import { CountryCode } from '@domain/country'
import { GroupId } from '@domain/group'
import { Gender } from '@domain/lib'
import {
  Channel,
  Channels,
  ChannelId,
  ChannelIds,
  ChannelTitle
} from '@domain/youtube/'

export interface ChannelRepository {
  findAll: (args: {
    where?: {
      id?: ChannelIds
      title?: ChannelTitle
      group?: GroupId
      gender?: Gender
      country?: CountryCode
    }
    orderBy?: Partial<
      Record<'id' | 'publishedAt' | 'subscriberCount' | 'viewCount', 'asc' | 'desc'>
    >[]
    limit?: number
    offset?: number
  }) => Promise<Channels>

  count: (args: {
    where?: {
      group?: GroupId
      gender?: Gender
      country?: CountryCode
    }
  }) => Promise<number>

  findById: (id: ChannelId) => Promise<Channel | null>

  bulkCreate: (args: { data: Channels }) => Promise<void>

  bulkUpdate: (args: { data: Channels }) => Promise<void>
}
