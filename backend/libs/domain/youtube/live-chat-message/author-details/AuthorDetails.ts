import { Exclude } from 'class-transformer'
import { DisplayName, IsChatSponsor, ProfileImageUrl } from '@domain/author'
import { ChannelId } from '@domain/youtube/channel'

export class AuthorDetails {
  @Exclude()
  public readonly channelId: ChannelId
  @Exclude()
  public readonly displayName: DisplayName
  @Exclude()
  public readonly profileImageUrl: ProfileImageUrl
  /** チャンネルメンバーによるメッセージなら true */
  @Exclude()
  public readonly isChatSponsor: IsChatSponsor

  constructor(args: {
    channelId: ChannelId
    displayName: DisplayName
    profileImageUrl: ProfileImageUrl
    isChatSponsor: IsChatSponsor
  }) {
    this.channelId = args.channelId
    this.displayName = args.displayName
    this.profileImageUrl = args.profileImageUrl
    this.isChatSponsor = args.isChatSponsor
  }
}
