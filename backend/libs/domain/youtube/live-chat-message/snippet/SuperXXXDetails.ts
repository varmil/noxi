export class SuperXXXDetails {
  public readonly amountMicros: number
  public readonly currency: string
  public readonly amountDisplayString: string
  public readonly tier: number

  constructor(args: {
    amountMicros: number
    currency: string
    amountDisplayString: string
    tier: number
  }) {
    this.amountMicros = args.amountMicros
    this.currency = args.currency
    this.amountDisplayString = args.amountDisplayString
    this.tier = args.tier
  }
}
