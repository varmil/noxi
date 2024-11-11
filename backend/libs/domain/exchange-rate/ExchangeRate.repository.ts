import { ExchangeRates } from '@domain/exchange-rate'

export interface ExchangeRateRepository {
  /** base = JPY のレート一覧 */
  findAll: () => Promise<ExchangeRates>

  update: () => Promise<void>
}
