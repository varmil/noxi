import BigNumber from 'bignumber.js'
import { ExchangeRates } from '@domain/exchange-rate'
import { Collection } from '@domain/lib/Collection'
import { AmountMicros } from '@domain/supers/base'
import { SuperSticker } from '@domain/supers/sticker/SuperSticker.entity'

export class SuperStickers extends Collection<SuperSticker> {
  constructor(protected readonly list: SuperSticker[]) {
    super(list)
  }

  /** @returns Rounded Micro JPY */
  calculateTotalInJPY(rates: ExchangeRates): AmountMicros {
    let totalInJPY = new AmountMicros(BigNumber(0))

    for (const sticker of this.list) {
      const amountInJPY = sticker.convertToJPY(rates)
      totalInJPY = totalInJPY.plus(amountInJPY)
    }

    return totalInJPY.round()
  }
}
