import { Transform } from 'class-transformer'
import { Currency } from '@domain/lib/currency'
import { PriceMicros } from '@domain/membership-price'
import { ChannelId } from '@domain/youtube'

export class MembershipPrice {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: Currency }) => value.get())
  public readonly currency: Currency = Currency.JPY
  @Transform(({ value }: { value: PriceMicros }) => value.get())
  public readonly priceMicros: PriceMicros

  constructor(args: { channelId: ChannelId; priceMicros: PriceMicros }) {
    this.channelId = args.channelId
    this.priceMicros = args.priceMicros
  }
}
