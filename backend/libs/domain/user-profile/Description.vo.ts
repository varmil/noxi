import { IsString } from 'class-validator'
import xss from 'xss'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

/** 自己紹介文 */
export class Description extends StringValueObject {
  @IsString()
  protected readonly val: string

  constructor(val: string) {
    val = xss(val)
    super(val)
    this.val = val
  }
}
