import { ChannelRegistration } from '@domain/channel-registration'
import { Collection } from '@domain/lib/Collection'

export class ChannelRegistrations extends Collection<ChannelRegistration> {
  constructor(protected readonly list: ChannelRegistration[]) {
    super(list)
  }
}
