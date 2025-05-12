import { IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

/** 自己紹介文 */
export class Description extends StringValueObject {
  @IsString()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
