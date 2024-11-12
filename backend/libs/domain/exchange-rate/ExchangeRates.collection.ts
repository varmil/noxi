import { ExchangeRate, Rate } from '@domain/exchange-rate'
import { Collection } from '@domain/lib/Collection'
import { Currency } from '@domain/lib/currency'

export class ExchangeRates extends Collection<ExchangeRate> {
  constructor(protected readonly list: ExchangeRate[]) {
    super(list)
  }

  getRate(currency: Currency): Rate {
    const e = this.list.find(r => r.currency.equals(currency))
    if (!e) {
      throw new Error(`Unsupported currency: ${currency.get()}`)
    }
    return e.rate
  }
}
