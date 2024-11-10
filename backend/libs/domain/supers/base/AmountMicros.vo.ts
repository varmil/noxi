import { IsNotEmpty } from 'class-validator'
import { BigIntValueObject } from '@domain/lib/BigIntValueObject'

export class AmountMicros extends BigIntValueObject {
  @IsNotEmpty()
  protected readonly val: bigint

  constructor(val: bigint) {
    super(val)
    this.val = val
  }
}
