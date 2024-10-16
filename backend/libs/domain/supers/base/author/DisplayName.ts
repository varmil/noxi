import { IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

/** 空文字列の場合があるのでEmpty許容 */
export class DisplayName extends StringValueObject {
  @IsString()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
