import { Transform } from 'class-transformer'
import { AmountMicros } from '@domain/supers/base'
import { ChannelId } from '@domain/youtube'

export class SupersSummary {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly last7Days: AmountMicros
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly last30Days: AmountMicros
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly last90Days: AmountMicros
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly last1Year: AmountMicros
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly thisWeek: AmountMicros
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly thisMonth: AmountMicros
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly thisYear: AmountMicros

  public readonly createdAt: Date

  constructor(args: {
    channelId: ChannelId
    last7Days: AmountMicros
    last30Days: AmountMicros
    last90Days: AmountMicros
    last1Year: AmountMicros
    thisWeek: AmountMicros
    thisMonth: AmountMicros
    thisYear: AmountMicros
    createdAt: Date
  }) {
    this.channelId = args.channelId
    this.last7Days = args.last7Days
    this.last30Days = args.last30Days
    this.last90Days = args.last90Days
    this.last1Year = args.last1Year
    this.thisWeek = args.thisWeek
    this.thisMonth = args.thisMonth
    this.thisYear = args.thisYear
    this.createdAt = args.createdAt
  }

  static zero(channelId: ChannelId): SupersSummary {
    const zero = new AmountMicros(0)
    return new SupersSummary({
      channelId,
      last7Days: zero,
      last30Days: zero,
      last90Days: zero,
      last1Year: zero,
      thisWeek: zero,
      thisMonth: zero,
      thisYear: zero,
      createdAt: new Date()
    })
  }
}
