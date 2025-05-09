import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib'

/** アクションによって獲得した枚数 */
export class Awarded extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
