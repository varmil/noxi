import { IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class PlaylistId extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
