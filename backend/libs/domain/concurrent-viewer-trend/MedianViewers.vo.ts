import { IsNotEmpty, IsNumber } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

/** 同時視聴者数の中央値 */
export class MedianViewers extends NumberValueObject {
  @IsNotEmpty()
  @IsNumber()
  protected readonly val: number

  constructor(val: number) {
    const rounded = Math.round(val)
    super(rounded)
    this.val = rounded
  }
}
