import { Exclude } from 'class-transformer'
import { PublishedAt } from '@domain/youtube'
import {
  Type,
  SuperChatDetails,
  SuperStickerDetails
} from '@domain/youtube/live-chat-message'

export class Snippet {
  @Exclude()
  public readonly type: Type
  @Exclude()
  public readonly publishedAt: PublishedAt
  @Exclude()
  public readonly superChatDetails?: SuperChatDetails
  @Exclude()
  public readonly superStickerDetails?: SuperStickerDetails

  constructor(args: {
    type: Type
    publishedAt: PublishedAt
    superChatDetails?: SuperChatDetails
    superStickerDetails?: SuperStickerDetails
  }) {
    this.type = args.type
    this.publishedAt = args.publishedAt
    this.superChatDetails = args.superChatDetails
    this.superStickerDetails = args.superStickerDetails
  }
}
