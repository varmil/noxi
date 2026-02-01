import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { StringValueObject } from '@domain/lib'

/**
 * Stripe Payment Intent ID (e.g., pi_xxxxx)
 */
export class StripePaymentId extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @Matches(/^pi_/)
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
