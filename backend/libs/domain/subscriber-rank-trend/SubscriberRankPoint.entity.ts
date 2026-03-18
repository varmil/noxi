import { Transform } from 'class-transformer'
import { Rank } from '@domain/ranking'
import { SubscriberCount } from '@domain/youtube/channel'
import { TotalChannels } from './TotalChannels.vo'
import { Week } from './Week.vo'

export class SubscriberRankPoint {
  @Transform(({ value }: { value: Week }) => value.get())
  public readonly week: Week

  @Transform(({ value }: { value: Rank }) => value.get())
  public readonly rank: Rank

  @Transform(({ value }: { value: TotalChannels }) => value.get())
  public readonly totalChannels: TotalChannels

  @Transform(({ value }: { value: SubscriberCount }) => value.get())
  public readonly subscriberCount: SubscriberCount

  constructor(args: {
    week: Week
    rank: Rank
    totalChannels: TotalChannels
    subscriberCount: SubscriberCount
  }) {
    this.week = args.week
    this.rank = args.rank
    this.totalChannels = args.totalChannels
    this.subscriberCount = args.subscriberCount
  }
}
