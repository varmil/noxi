import { IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class VideoDescription extends StringValueObject {
  @IsString()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
