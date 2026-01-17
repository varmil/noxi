import { Collection } from '@domain/lib/Collection'
import { InactiveChannel } from './InactiveChannel.entity'

export class InactiveChannels extends Collection<InactiveChannel> {
  constructor(protected readonly list: InactiveChannel[]) {
    super(list)
  }
}
