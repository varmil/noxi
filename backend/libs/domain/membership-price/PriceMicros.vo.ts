import BigNumber from 'bignumber.js'
import { IsNotEmpty } from 'class-validator'
import { BigNumberValueObject } from '@domain/lib/vo/BigNumberValueObject'

export class PriceMicros extends BigNumberValueObject {
  @IsNotEmpty()
  protected readonly val: BigNumber

  constructor(val: string | number | BigNumber.Instance | bigint) {
    if (typeof val === 'bigint') {
      val = val.toString()
    }

    super(BigNumber(val))
    this.val = BigNumber(val)
  }
}
