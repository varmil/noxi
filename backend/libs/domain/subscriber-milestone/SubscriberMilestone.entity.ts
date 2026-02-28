import { Transform } from 'class-transformer'
import { ChannelId } from '@domain/youtube'
import { Milestone } from './Milestone.vo'

export class SubscriberMilestone {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId

  @Transform(({ value }: { value: Milestone }) => value.get())
  public readonly milestone: Milestone

  public readonly postedAt: Date

  constructor(args: {
    channelId: ChannelId
    milestone: Milestone
    postedAt: Date
  }) {
    this.channelId = args.channelId
    this.milestone = args.milestone
    this.postedAt = args.postedAt
  }
}
