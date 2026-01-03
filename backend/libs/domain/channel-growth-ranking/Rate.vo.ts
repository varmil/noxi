import { IsNotEmpty, IsNumber, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

/** 登録者数の増加率（%） */
export class Rate extends NumberValueObject {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  protected readonly val: number

  constructor(val: number | string) {
    if (typeof val === 'string') {
      val = Number(val)
    }
    // 小数点2桁に丸める
    val = Math.round(val * 100) / 100
    super(val)
    this.val = val
  }
}
