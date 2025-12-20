import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

/**
 * 曜日を表す値オブジェクト
 * 0 = 月曜日, 1 = 火曜日, ..., 6 = 日曜日
 */
export class DayOfWeek extends NumberValueObject {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(6)
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
