import { Exclude, Transform  } from 'class-transformer'
import { AmountMicros } from '@domain/lib/currency'
import { Period, PeriodStrings } from '@domain/lib/period'
import { Count } from '@domain/membership'
import { ChannelId } from '@domain/youtube'

export class MembershipSummary {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Exclude()
  readonly period: Period
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly amountMicros: AmountMicros
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly count: Count

  public readonly createdAt: Date

  constructor(args: {
    channelId: ChannelId
    period: Period
    count: Count
    amountMicros: AmountMicros
    createdAt: Date
  }) {
    this.channelId = args.channelId
    this.period = args.period
    this.count = args.count
    this.amountMicros = args.amountMicros
    this.createdAt = args.createdAt
  }

  @Exclude()
  static zero(channelId: ChannelId, period: Period): MembershipSummary {
    return new MembershipSummary({
      channelId,
      period,
      count: new Count(0),
      amountMicros: new AmountMicros(0),
      createdAt: new Date()
    })
  }

  /** last24Hoursは除く */
  @Exclude()
  static allPeriods = () =>
    PeriodStrings.filter(p => p !== 'last24Hours').map(p => new Period(p))
}
