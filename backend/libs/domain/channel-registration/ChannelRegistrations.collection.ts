import { Exclude } from 'class-transformer'
import { ChannelRegistration } from '@domain/channel-registration'
import { Collection } from '@domain/lib/Collection'
import { ChannelIds } from '@domain/youtube'

export class ChannelRegistrations extends Collection<ChannelRegistration> {
  constructor(protected readonly list: ChannelRegistration[]) {
    super(list)
  }

  @Exclude()
  ids(): ChannelIds {
    return new ChannelIds(this.list.map(e => e.channelId))
  }
}
