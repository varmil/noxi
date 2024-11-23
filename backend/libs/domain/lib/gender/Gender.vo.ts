import { IsIn, IsNotEmpty } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class Gender extends StringValueObject {
  static readonly Male = new Gender('male')
  static readonly Female = new Gender('female')

  @IsNotEmpty()
  @IsIn(['male', 'female'])
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
