import { IsNotEmpty } from 'class-validator'
import { DateValueObject } from '@domain/lib/vo/DateValueObject'

export class GroupRegistrationAppliedAt extends DateValueObject {
  @IsNotEmpty()
  protected readonly val: Date

  constructor(val: Date) {
    super(val)
    this.val = val
  }
}
