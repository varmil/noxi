import { Collection } from '@domain/lib/Collection'
import { ChatBundleQueue } from './ChatBundleQueue.entity'

export class ChatBundleQueues extends Collection<ChatBundleQueue> {
  constructor(protected readonly list: ChatBundleQueue[]) {
    super(list)
  }
}
