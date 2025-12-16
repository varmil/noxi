import {
  ChannelRegistration,
  ChannelRegistrations,
  Status
} from '@domain/channel-registration'
import { GroupId } from '@domain/group'
import { ChannelId, ChannelIds } from '@domain/youtube'

export interface ChannelRegistrationRepository {
  findAll: (args: {
    where: {
      status?: Status
    }
    orderBy: {
      appliedAt: 'asc' | 'desc'
    }
    limit?: number
    offset?: number
  }) => Promise<ChannelRegistrations>

  findById: (channelId: ChannelId) => Promise<ChannelRegistration | null>

  save: (args: ChannelRegistration) => Promise<void>

  updateMany: (args: {
    where: {
      channelIds: ChannelIds
      status?: Status
    }
    data: {
      status: Status
      group?: GroupId
    }
  }) => Promise<void>
}
