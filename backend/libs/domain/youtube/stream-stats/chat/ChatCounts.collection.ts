import { Collection } from '@domain/lib/Collection'
import { ChatCount } from '@domain/youtube'

export class ChatCounts extends Collection<ChatCount> {
  constructor(protected readonly list: ChatCount[]) {
    super(list)
  }
}
