import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

/**
 * すべてのアップロードの数
 */
export class VideoCount extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  protected readonly val: number

  constructor(val: number | bigint) {
    if (typeof val === 'bigint') {
      val = Number(val)
    }
    super(val)
    this.val = val
  }
}
