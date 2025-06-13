import { Transform } from 'class-transformer'
import { ChannelId, SubscriberCount } from '@domain/youtube'

export class SubscriberCountSummary {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: SubscriberCount }) => value.get())
  public readonly subscriberCount: SubscriberCount

  public readonly createdAt: Date

  constructor(args: {
    channelId: ChannelId
    subscriberCount: SubscriberCount
    createdAt: Date
  }) {
    this.channelId = args.channelId
    this.subscriberCount = args.subscriberCount
    this.createdAt = args.createdAt
  }
}
