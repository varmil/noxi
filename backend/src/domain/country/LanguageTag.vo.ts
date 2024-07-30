import { IsLocale, IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

/**
 *
 */
export class LanguageTag extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @IsLocale()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
