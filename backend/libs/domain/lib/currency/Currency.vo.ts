import { IsNotEmpty, Length } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class Currency extends StringValueObject {
  static readonly JPY = new Currency('JPY')

  @IsNotEmpty()
  @Length(3, 3)
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
