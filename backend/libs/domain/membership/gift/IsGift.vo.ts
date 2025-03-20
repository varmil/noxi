import { IsNotEmpty } from 'class-validator'
import { BooleanValueObject } from '@domain/lib'

export class IsGift extends BooleanValueObject {
  @IsNotEmpty()
  public readonly val: boolean

  constructor(val: boolean) {
    super(val)
    this.val = val
  }
}
