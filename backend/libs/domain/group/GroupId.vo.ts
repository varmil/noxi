import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class GroupId extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Group ID must contain only lowercase alphanumeric characters and hyphens'
  })
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
