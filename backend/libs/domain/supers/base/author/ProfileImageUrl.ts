import { IsNotEmpty, IsUrl } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class ProfileImageUrl extends StringValueObject {
  @IsNotEmpty()
  @IsUrl()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
