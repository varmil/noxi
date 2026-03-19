import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator'
import { Interval, IntervalStrings } from '@domain/channel-statistics/count-history'
import { ChannelId } from '@domain/youtube/channel'

export class GetAggregatedSubscriberCountsDto {
  @IsNotEmpty()
  @IsString()
  channelId!: string

  @IsNotEmpty()
  @IsString()
  gte!: string

  @IsNotEmpty()
  @IsString()
  lt!: string

  @IsOptional()
  @IsIn(IntervalStrings)
  interval?: string

  toChannelId(): ChannelId {
    return new ChannelId(this.channelId)
  }

  toGte(): Date {
    return new Date(this.gte)
  }

  toLt(): Date {
    return new Date(this.lt)
  }

  toInterval(): Interval {
    return new Interval(this.interval ?? 'daily')
  }
}
