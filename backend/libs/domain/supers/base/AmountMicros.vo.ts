import BigNumber from 'bignumber.js'
import { IsNotEmpty } from 'class-validator'
import { Amount } from '@domain/lib/currency/Amount.vo'
import { BigNumberValueObject } from '@domain/lib/vo/BigNumberValueObject'

export class AmountMicros extends BigNumberValueObject {
  @IsNotEmpty()
  protected readonly val: BigNumber

  constructor(val: string | number | BigNumber.Instance) {
    super(BigNumber(val))
    this.val = BigNumber(val)
  }

  toAmount() {
    return new Amount(this.val.div(1_000_000))
  }
}
