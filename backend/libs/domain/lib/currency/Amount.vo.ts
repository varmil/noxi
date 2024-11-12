import BigNumber from 'bignumber.js'
import { IsNotEmpty } from 'class-validator'
import { BigNumberValueObject } from '@domain/lib/vo/BigNumberValueObject'

/** ベース金額（Microでない） */
export class Amount extends BigNumberValueObject {
  @IsNotEmpty()
  protected readonly val: BigNumber

  constructor(val: BigNumber) {
    super(val)
    this.val = val
  }
}
