import { Rate } from '@domain/exchange-rate'
import { Currency } from '@domain/lib/currency'
import { Transform } from 'class-transformer'

export class ExchangeRate {
  @Transform(({ value }: { value: Currency }) => value.get())
  public readonly currency: Currency
  @Transform(({ value }: { value: Rate }) => value.get())
  public readonly rate: Rate

  constructor(args: { currency: Currency; rate: Rate }) {
    this.currency = args.currency
    this.rate = args.rate
  }
}
