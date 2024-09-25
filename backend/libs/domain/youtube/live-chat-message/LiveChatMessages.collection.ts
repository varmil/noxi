import { Collection } from '@domain/lib/Collection'
import { LiveChatMessage } from '@domain/youtube/live-chat-message'

export class LiveChatMessages extends Collection<LiveChatMessage> {
  constructor(protected readonly list: LiveChatMessage[]) {
    super(list)
  }

  get superChats() {
    return new LiveChatMessages(this.list.filter(e => e.isSuperChat))
  }
}
