import { Transform } from 'class-transformer'
import { AmountMicros } from '@domain/lib/currency'
import { ChannelId } from '@domain/youtube'

export class SupersBundleSum {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly amountMicros: AmountMicros

  constructor(args: { channelId: ChannelId; amountMicros: AmountMicros }) {
    this.channelId = args.channelId
    this.amountMicros = args.amountMicros
  }
}
