import { IsInt, IsNotEmpty } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

/**
 * すべてのアップロード > ライブ配信 の数
 */
export class LiveStreamCount extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
