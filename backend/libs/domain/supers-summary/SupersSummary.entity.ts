import { Transform } from 'class-transformer'
import { Group } from '@domain/group'
import { AmountMicros } from '@domain/supers/base'
import { ChannelId } from '@domain/youtube'

export class SupersSummary {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId

  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly last7days: AmountMicros
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly last30days: AmountMicros
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly last90days: AmountMicros
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly last1year: AmountMicros
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly thisWeek: AmountMicros
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly thisMonth: AmountMicros
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly thisYear: AmountMicros

  @Transform(({ value }: { value: Group }) => value.get())
  public readonly group: Group

  public readonly createdAt: Date

  constructor(args: {
    channelId: ChannelId

    last7days: AmountMicros
    last30days: AmountMicros
    last90days: AmountMicros
    last1year: AmountMicros
    thisWeek: AmountMicros
    thisMonth: AmountMicros
    thisYear: AmountMicros

    group: Group
    createdAt: Date
  }) {
    this.channelId = args.channelId

    this.last7days = args.last7days
    this.last30days = args.last30days
    this.last90days = args.last90days
    this.last1year = args.last1year
    this.thisWeek = args.thisWeek
    this.thisMonth = args.thisMonth
    this.thisYear = args.thisYear

    this.group = args.group
    this.createdAt = args.createdAt
  }
}
