import BigNumber from 'bignumber.js'
import { ExchangeRates } from '@domain/exchange-rate'
import { Collection } from '@domain/lib/Collection'
import { Currency } from '@domain/lib/currency'
import { AmountMicros } from '@domain/supers/base'
import { SuperSticker } from '@domain/supers/sticker/SuperSticker.entity'

export class SuperStickers extends Collection<SuperSticker> {
  constructor(protected readonly list: SuperSticker[]) {
    super(list)
  }

  /** @returns Rounded Micro JPY */
  calculateTotalInJPY(rates: ExchangeRates): AmountMicros {
    let totalInJPY = new AmountMicros(BigNumber(0))

    for (const chat of this.list) {
      const amountInJPY = this.convertToJPY(
        chat.amountMicros,
        chat.currency,
        rates
      )
      totalInJPY = totalInJPY.plus(amountInJPY)
    }

    return totalInJPY.round()
  }

  private convertToJPY(
    amount: AmountMicros,
    currency: Currency,
    er: ExchangeRates
  ): AmountMicros {
    if (currency.equals(Currency.JPY)) return amount
    const rate = er.getRate(currency)
    return amount.div(rate.get())
  }
}
