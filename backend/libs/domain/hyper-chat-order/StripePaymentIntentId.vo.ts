import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { StringValueObject } from '@domain/lib'

export class StripePaymentIntentId extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @Matches(/^pi_/)
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
