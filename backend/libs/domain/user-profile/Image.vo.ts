import { IsNotEmpty, IsUrl } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

/** URL */
export class Image extends StringValueObject {
  @IsNotEmpty()
  @IsUrl()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
