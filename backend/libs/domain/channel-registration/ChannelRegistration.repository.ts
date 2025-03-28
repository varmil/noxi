import {
  ChannelRegistration,
  ChannelRegistrations
} from '@domain/channel-registration'

export interface ChannelRegistrationRepository {
  findAll: () => Promise<ChannelRegistrations>

  save: (args: ChannelRegistration) => Promise<void>
}
