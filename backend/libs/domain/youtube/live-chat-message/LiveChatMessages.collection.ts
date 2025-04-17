import { Collection } from '@domain/lib/Collection'
import { PublishedAt } from '@domain/youtube/datetime'
import { LiveChatMessage } from '@domain/youtube/live-chat-message'

export class LiveChatMessages extends Collection<LiveChatMessage> {
  constructor(protected readonly list: LiveChatMessage[]) {
    super(list)
  }

  get superChats() {
    return new LiveChatMessages(this.list.filter(e => e.isSuperChat))
  }

  get superStickers() {
    return new LiveChatMessages(this.list.filter(e => e.isSuperSticker))
  }

  get latestPublishedAt() {
    if (this.list.length === 0) return undefined
    return this.list[this.list.length - 1].snippet.publishedAt
  }

  selectNewerThan(date?: PublishedAt) {
    return new LiveChatMessages(
      this.list.filter(e => !date || e.snippet.publishedAt.get() > date.get())
    )
  }
}
