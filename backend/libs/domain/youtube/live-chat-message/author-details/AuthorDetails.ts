import { Exclude } from 'class-transformer'
import {
  ChannelURL,
  DisplayName,
  IsChatSponsor,
  ProfileImageUrl
} from '@domain/supers/base/author'
import { ChannelId } from '@domain/youtube/channel'

export class AuthorDetails {
  @Exclude()
  public readonly channelId: ChannelId
  @Exclude()
  public readonly channelUrl: ChannelURL
  @Exclude()
  public readonly displayName: DisplayName
  @Exclude()
  public readonly profileImageUrl: ProfileImageUrl
  @Exclude()
  public readonly isVerified: boolean
  @Exclude()
  public readonly isChatOwner: boolean
  /** チャンネルメンバーによるメッセージなら true */
  @Exclude()
  public readonly isChatSponsor: IsChatSponsor
  @Exclude()
  public readonly isChatModerator: boolean

  constructor(args: {
    channelId: ChannelId
    channelUrl: ChannelURL
    displayName: DisplayName
    profileImageUrl: ProfileImageUrl
    isVerified: boolean
    isChatOwner: boolean
    isChatSponsor: IsChatSponsor
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
