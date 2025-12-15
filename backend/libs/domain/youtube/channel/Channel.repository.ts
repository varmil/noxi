import { CountryCode } from '@domain/country'
import { GroupName } from '@domain/group'
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
      group?: GroupName
      gender?: Gender
      country?: CountryCode
    }
    orderBy?: Partial<
      Record<'publishedAt' | 'subscriberCount' | 'viewCount', 'asc' | 'desc'>
    >[]
    limit?: number
    offset?: number
  }) => Promise<Channels>

  count: (args: {
    where?: {
      group?: GroupName
      gender?: Gender
      country?: CountryCode
    }
  }) => Promise<number>

  findById: (id: ChannelId) => Promise<Channel | null>

  bulkCreate: (args: { data: Channels }) => Promise<void>

  bulkUpdate: (args: { data: Channels }) => Promise<void>
}
