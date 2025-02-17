import { ExchangeRates } from '@domain/exchange-rate'
import { Collection } from '@domain/lib/Collection'
import { AmountMicros } from '@domain/supers/base'
import { SuperChat } from '@domain/supers/chat/SuperChat.entity'

export class SuperChats extends Collection<SuperChat> {
  constructor(protected readonly list: SuperChat[]) {
    super(list)
  }

  /** @returns Rounded Micro JPY */
  calculateTotalInJPY(rates: ExchangeRates): AmountMicros {
    let totalInJPY = new AmountMicros(0)

    for (const chat of this.list) {
      const amountInJPY = chat.convertToJPY(rates)
      totalInJPY = totalInJPY.plus(amountInJPY)
    }

    return totalInJPY.round()
  }
}
