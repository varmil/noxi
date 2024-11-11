import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

const MAX_LENGTH = 40

/**
 * MAX Length = 40
 */
export class Keyword extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_LENGTH)
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }

  static isValidLength(str: string) {
    return 0 < str.length && str.length <= MAX_LENGTH
  }

  static removeQuotes(str: string) {
    return str.replace(/['"]+/g, '')
  }
}
