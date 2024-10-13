import { ChannelId } from '@domain/youtube'
import { DisplayName } from './DisplayName'
import { IsChatSponsor } from './IsChatSponsor'
import { ProfileImageUrl } from './ProfileImageUrl'

export class Author {
  public readonly channelId: ChannelId
  public readonly displayName: DisplayName
  public readonly profileImageUrl: ProfileImageUrl
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
