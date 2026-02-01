import { HyperChat } from '@domain/hyper-chat'
import { Collection } from '@domain/lib/Collection'

export class HyperChats extends Collection<HyperChat> {
  constructor(protected readonly list: HyperChat[]) {
    super(list)
  }
}
