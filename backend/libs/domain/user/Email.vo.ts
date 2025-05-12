import { IsEmail, IsNotEmpty } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class Email extends StringValueObject {
  @IsNotEmpty()
  @IsEmail()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
