import { IsNotEmpty, IsNumber } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

/**
 * 整数値
 * Stream Stats系のカウント（Avarage）
 */
export class AvgCount extends NumberValueObject {
  @IsNotEmpty()
  @IsNumber()
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = Math.round(val)
  }
}
