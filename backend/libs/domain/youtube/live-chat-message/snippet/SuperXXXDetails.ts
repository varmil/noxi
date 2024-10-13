import {
  AmountMicros,
  Currency,
  AmountDisplayString,
  Tier
} from '@domain/super-xxx'

export class SuperXXXDetails {
  public readonly amountMicros: AmountMicros
  public readonly currency: Currency
  public readonly amountDisplayString: AmountDisplayString
  public readonly tier: Tier

  constructor(args: {
    amountMicros: AmountMicros
    currency: Currency
    amountDisplayString: AmountDisplayString
    tier: Tier
  }) {
    this.amountMicros = args.amountMicros
    this.currency = args.currency
    this.amountDisplayString = args.amountDisplayString
    this.tier = args.tier
  }
}
