import { Exclude } from 'class-transformer'
import { Collection } from '@domain/lib/Collection'
import { ChannelId } from '@domain/youtube'

export class ChannelIds extends Collection<ChannelId> {
  constructor(protected readonly list: ChannelId[]) {
    super(list)
  }

  @Exclude()
  join = (separator?: string) => this.list.map(e => e.get()).join(separator)
}
