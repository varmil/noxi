import { IsNotEmpty } from 'class-validator'
import { DateValueObject } from '@domain/lib/DateValueObject'

export class PublishedAt extends DateValueObject {
  @IsNotEmpty()
  protected readonly val: Date

  constructor(val: Date) {
    super(val)
    this.val = val
  }
}
