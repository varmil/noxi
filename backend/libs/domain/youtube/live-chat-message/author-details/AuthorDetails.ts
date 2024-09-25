import { Exclude } from 'class-transformer'

export class AuthorDetails {
  @Exclude()
  public readonly channelId: string
  @Exclude()
  public readonly channelUrl: string
  @Exclude()
  public readonly displayName: string
  @Exclude()
  public readonly profileImageUrl: string
  @Exclude()
  public readonly isVerified: boolean
  @Exclude()
  public readonly isChatOwner: boolean
  /** チャンネルメンバーによるメッセージなら true */
  @Exclude()
  public readonly isChatSponsor: boolean
  @Exclude()
  public readonly isChatModerator: boolean

  constructor(args: {
    channelId: string
    channelUrl: string
    displayName: string
    profileImageUrl: string
    isVerified: boolean
    isChatOwner: boolean
    isChatSponsor: boolean
    isChatModerator: boolean
  }) {
    this.channelId = args.channelId
    this.channelUrl = args.channelUrl
    this.displayName = args.displayName
    this.profileImageUrl = args.profileImageUrl
    this.isVerified = args.isVerified
    this.isChatOwner = args.isChatOwner
    this.isChatSponsor = args.isChatSponsor
    this.isChatModerator = args.isChatModerator
  }
}
