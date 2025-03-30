import { Transform } from 'class-transformer'
import { AmountMicros } from '@domain/lib/currency'
import { ChannelId } from '@domain/youtube'

/**
 * 毎月最終日の集計（つまり月ごとの集計）
 */
export class SupersMonthlySummary {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly thisMonth: AmountMicros

  public readonly createdAt: Date

  constructor(args: {
    channelId: ChannelId
    thisMonth: AmountMicros
    createdAt: Date
  }) {
    this.channelId = args.channelId
    this.thisMonth = args.thisMonth
    this.createdAt = args.createdAt
  }
}
