import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { BigIntValueObject } from '@domain/lib'

export class ViewCount extends BigIntValueObject {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  protected readonly val: bigint

  constructor(val: bigint) {
    super(val)
    this.val = val
  }
}
