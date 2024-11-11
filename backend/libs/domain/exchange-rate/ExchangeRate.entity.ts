import { Rate } from '@domain/exchange-rate'
import { Currency } from '@domain/lib/currency'

export class ExchangeRate {
  currency: Currency
  rate: Rate

  constructor(args: { currency: Currency; rate: Rate }) {
    this.currency = args.currency
    this.rate = args.rate
  }
}
