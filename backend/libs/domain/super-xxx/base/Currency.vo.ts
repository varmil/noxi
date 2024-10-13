import { IsISO4217CurrencyCode, IsNotEmpty } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

export class Currency extends StringValueObject {
  @IsNotEmpty()
  @IsISO4217CurrencyCode()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
