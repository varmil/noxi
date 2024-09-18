import { Exclude } from 'class-transformer'
import { Collection } from '@domain/lib/Collection'
import { ChannelId } from '@domain/youtube'

export class ChannelIds extends Collection<ChannelId> {
  protected readonly list: ChannelId[]

  constructor(list: ChannelId[]) {
    super(list)
    this.list = list
  }

  @Exclude()
  get() {
    return this.list
  }

  @Exclude()
  join = (separator?: string) => this.list.map(e => e.get()).join(separator)
}
