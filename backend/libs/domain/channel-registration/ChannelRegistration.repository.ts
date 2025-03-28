import {
  ChannelRegistration,
  ChannelRegistrations,
  Status
} from '@domain/channel-registration'
import { ChannelId } from '@domain/youtube'

export interface ChannelRegistrationRepository {
  findAll: (args: {
    where: {
      status: Status
    }
    orderBy: {
      appliedAt: 'asc' | 'desc'
    }
    limit?: number
    offset?: number
  }) => Promise<ChannelRegistrations>

  findById: (channelId: ChannelId) => Promise<ChannelRegistration | null>

  save: (args: ChannelRegistration) => Promise<void>
}
