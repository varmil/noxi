import { ExchangeRate } from '@domain/exchange-rate'
import { Collection } from '@domain/lib/Collection'

export class ExchangeRates extends Collection<ExchangeRate> {
  constructor(protected readonly list: ExchangeRate[]) {
    super(list)
  }
}
