import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

export class Rank extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
