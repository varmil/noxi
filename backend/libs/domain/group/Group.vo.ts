import { IsIn, IsNotEmpty } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

export class Group extends StringValueObject {
  @IsNotEmpty({ message: 'Group cannot be empty' })
  @IsIn(['hololive', 'hololive-english', 'hololive-indonesia'])
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
