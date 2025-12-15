import { IsNotEmpty } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

export class GroupRegistrationId extends NumberValueObject {
  @IsNotEmpty()
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
