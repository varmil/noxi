import { IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

export class Country extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  protected readonly val: string // JP

  // TODO: default should not be JP
  constructor(val = 'JP') {
    super(val)
    this.val = val
  }
}
