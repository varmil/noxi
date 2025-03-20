import { Collection } from '@domain/lib/Collection'
import { ChatEventsBundleQueue } from './ChatEventsBundleQueue.entity'

export class ChatEventsBundleQueues extends Collection<ChatEventsBundleQueue> {
  constructor(protected readonly list: ChatEventsBundleQueue[]) {
    super(list)
  }
}
