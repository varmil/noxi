import { IsNotEmpty, IsNumber } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

/** Stream Stats系のカウント（総数） */
export class Count extends NumberValueObject {
  @IsNotEmpty()
  @IsNumber()
  protected readonly val: number

  constructor(val: number | bigint) {
    if (typeof val === 'bigint') {
      val = Number(val)
    }
    super(val)
    this.val = val
  }

  addBy = (value: Count | number) => {
    if (value instanceof Count) {
      return new Count(this.val + value.val)
    }
    return new Count(this.val + value)
  }
}
