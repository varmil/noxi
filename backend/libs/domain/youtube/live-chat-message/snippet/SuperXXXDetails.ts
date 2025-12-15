import { Currency, AmountMicros  } from '@domain/lib/currency'
import { AmountDisplayString } from '@domain/supers'

export class SuperXXXDetails {
  public readonly amountMicros: AmountMicros
  public readonly currency: Currency
  public readonly amountDisplayString: AmountDisplayString

  constructor(args: {
    amountMicros: AmountMicros
    currency: Currency
    amountDisplayString: AmountDisplayString
  }) {
    this.amountMicros = args.amountMicros
    this.currency = args.currency
    this.amountDisplayString = args.amountDisplayString
  }
}
