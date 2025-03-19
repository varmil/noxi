import { Exclude } from 'class-transformer'
import { PublishedAt } from '@domain/youtube'
import {
  Type,
  SuperChatDetails,
  SuperStickerDetails,
  MembershipDetails
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
  @Exclude()
  public readonly membershipDetails?: MembershipDetails

  constructor(args: {
    type: Type
    publishedAt: PublishedAt
    superChatDetails?: SuperChatDetails
    superStickerDetails?: SuperStickerDetails
    membershipDetails?: MembershipDetails
  }) {
    this.type = args.type
    this.publishedAt = args.publishedAt
    this.superChatDetails = args.superChatDetails
    this.superStickerDetails = args.superStickerDetails
    this.membershipDetails = args.membershipDetails
  }
}
