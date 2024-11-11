import { IsNotEmpty, IsNumber } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

export class Tier extends NumberValueObject {
  @IsNotEmpty()
  @IsNumber()
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
