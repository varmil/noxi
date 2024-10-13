import { Expose } from 'class-transformer'
import {
  AuthorDetails,
  LiveChatMessageId,
  Snippet,
  Type
} from '@domain/youtube/live-chat-message'

export class LiveChatMessage {
  public readonly id: LiveChatMessageId
  public readonly snippet: Snippet
  public readonly authorDetails: AuthorDetails

  constructor(args: {
    id: LiveChatMessageId
    snippet: Snippet
    authorDetails: AuthorDetails
  }) {
    this.id = args.id
    this.snippet = args.snippet
    this.authorDetails = args.authorDetails
  }

  @Expose()
  get publishedAt() {
    return this.snippet.publishedAt
  }

  @Expose()
  get isSuperChat() {
    return this.snippet.type.equals(new Type('superChatEvent'))
  }

  @Expose()
  get isSuperSticker() {
    return this.snippet.type.equals(new Type('superStickerEvent'))
  }

  @Expose()
  get fromMember(): boolean {
    return this.authorDetails.isChatSponsor.get()
  }
}
