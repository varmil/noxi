import { BooleanValueObject } from '@domain/lib'
import { IsNotEmpty } from 'class-validator'

export class IsGift extends BooleanValueObject {
  @IsNotEmpty()
  public readonly val: boolean

  constructor(val: boolean) {
    super(val)
    this.val = val
  }
}
