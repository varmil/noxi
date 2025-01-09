import { z } from 'zod'

export const schema = z.object({
  currency: z.string(),
  rate: z.number()
})
export const responseSchema = z.object({ list: z.array(schema) })

export type ExchangeRateSchema = z.infer<typeof schema>
export type ExchangeRatesSchema = ExchangeRateSchema[]
