import { Collection } from '@domain/lib/Collection'
import { ChatDeletingQueue } from './ChatDeletingQueue.entity'

export class ChatDeletingQueues extends Collection<ChatDeletingQueue> {
  constructor(protected readonly list: ChatDeletingQueue[]) {
    super(list)
  }
}
