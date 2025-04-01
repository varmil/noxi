import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'

export class TopPercentage extends NumberValueObject {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
