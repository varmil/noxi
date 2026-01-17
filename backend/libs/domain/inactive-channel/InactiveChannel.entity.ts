import { Transform } from 'class-transformer'
import { GroupId } from '@domain/group'
import {
  ChannelId,
  ChannelTitle,
  SubscriberCount,
  ThumbnailUrl
} from '@domain/youtube'

export class InactiveChannel {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly id: ChannelId

  @Transform(({ value }: { value: ChannelTitle }) => value.get())
  public readonly title: ChannelTitle

  @Transform(({ value }: { value: GroupId }) => value.get())
  public readonly group: GroupId

  @Transform(({ value }: { value: SubscriberCount }) => value.get())
  public readonly subscriberCount: SubscriberCount

  @Transform(({ value }: { value: ThumbnailUrl | null }) => value?.get() ?? null)
  public readonly thumbnailUrl: ThumbnailUrl | null

  @Transform(({ value }: { value: Date | null }) => value?.toISOString() ?? null)
  public readonly lastStreamDate: Date | null

  constructor(args: {
    id: ChannelId
    title: ChannelTitle
    group: GroupId
    subscriberCount: SubscriberCount
    thumbnailUrl: ThumbnailUrl | null
    lastStreamDate: Date | null
  }) {
    this.id = args.id
    this.title = args.title
    this.group = args.group
    this.subscriberCount = args.subscriberCount
    this.thumbnailUrl = args.thumbnailUrl
    this.lastStreamDate = args.lastStreamDate
  }
}
