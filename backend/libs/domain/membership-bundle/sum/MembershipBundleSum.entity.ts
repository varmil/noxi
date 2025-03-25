import { Transform } from 'class-transformer'
import { AmountMicros } from '@domain/lib/currency'
import { Count } from '@domain/membership'
import { ChannelId } from '@domain/youtube'

export class MembershipBundleSum {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly amountMicros: AmountMicros
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly count: Count

  constructor(args: {
    channelId: ChannelId
    amountMicros: AmountMicros
    count: Count
  }) {
    this.channelId = args.channelId
    this.amountMicros = args.amountMicros
    this.count = args.count
  }
}
