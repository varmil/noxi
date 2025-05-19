import { IsNotEmpty, IsString } from 'class-validator'
import xss from 'xss'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class Name extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  protected readonly val: string

  constructor(val: string) {
    val = xss(val)
    super(val)
    this.val = val
  }
}
