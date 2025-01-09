import {
  ExchangeRatesSchema,
  responseSchema
} from 'apis/youtube/schema/exchangeRateSchema'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'

export async function getExchangeRates(): Promise<ExchangeRatesSchema> {
  const res = await fetchAPI(`/api/exchange-rates`, {
    next: { revalidate: CACHE_1D }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
