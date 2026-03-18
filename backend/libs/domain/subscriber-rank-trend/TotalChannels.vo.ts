import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

/** 週ごとのランキング参加チャンネル総数 */
export class TotalChannels extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  protected readonly val: number

  constructor(val: number | bigint) {
    if (typeof val === 'bigint') {
      val = Number(val)
    }
    super(val)
    this.val = val
  }
}
