import { Transform } from 'class-transformer'
import { AmountMicros } from '@domain/lib/currency'
import { ChannelId } from '@domain/youtube'

/**
 * 週間・月間スパチャランキング用のスナップショット
 * YoutubeStreamSupersSummary の特定時点のデータを表す
 */
export class SupersSnapshot {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId

  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly amountMicros: AmountMicros

  public readonly createdAt: Date

  constructor(args: {
    channelId: ChannelId
    amountMicros: AmountMicros
    createdAt: Date
  }) {
    this.channelId = args.channelId
    this.amountMicros = args.amountMicros
    this.createdAt = args.createdAt
  }
}
