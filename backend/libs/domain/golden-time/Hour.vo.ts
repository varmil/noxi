import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

/**
 * 時刻を表す値オブジェクト
 * 0 = 0時, 1 = 1時, ..., 23 = 23時
 */
export class Hour extends NumberValueObject {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(23)
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
