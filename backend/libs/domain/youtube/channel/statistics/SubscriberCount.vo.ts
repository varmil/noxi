import { IsInt, IsNotEmpty } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

export class SubscriberCount extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  protected readonly val: number

  constructor(val: number | bigint) {
    if (typeof val === 'bigint') {
      val = Number(val)
    }
    super(val)
    this.val = val
  }
}
