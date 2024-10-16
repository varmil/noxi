import { Exclude, Transform } from 'class-transformer'
import { ChannelId } from '@domain/youtube'
import { DisplayName } from './DisplayName'
import { IsChatSponsor } from './IsChatSponsor'
import { ProfileImageUrl } from './ProfileImageUrl'

export class Author {
  @Exclude()
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: DisplayName }) => value.get())
  public readonly displayName: DisplayName
  @Transform(({ value }: { value: ProfileImageUrl }) => value.get())
  public readonly profileImageUrl: ProfileImageUrl
  @Transform(({ value }: { value: IsChatSponsor }) => value.get())
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
