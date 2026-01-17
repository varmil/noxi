import { IsNotEmpty, IsString, IsUrl } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class ThumbnailUrl extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
