import { Exclude, Transform } from 'class-transformer'
import { Author } from '@domain/author'
import { GroupId } from '@domain/group'
import { Count, IsGift } from '@domain/membership'
import { LiveChatMessageId, VideoId, PublishedAt } from '@domain/youtube'

export class Membership {
  @Transform(({ value }: { value: LiveChatMessageId }) => value.get())
  public readonly id: LiveChatMessageId
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly count: Count
  @Transform(({ value }: { value: IsGift }) => value.get())
  public readonly isGift: IsGift

  public readonly author: Author

  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly videoId: VideoId
  @Exclude()
  public readonly group: GroupId
  @Transform(({ value }: { value: PublishedAt }) => value.get())
  public readonly createdAt: PublishedAt

  constructor(args: {
    id: LiveChatMessageId
    count: Count
    isGift: IsGift
    author: Author
    videoId: VideoId
    group: GroupId
    createdAt: PublishedAt
  }) {
    this.id = args.id
    this.count = args.count
    this.isGift = args.isGift
    this.author = args.author
    this.videoId = args.videoId
    this.group = args.group
    this.createdAt = args.createdAt
  }
}
