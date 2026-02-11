import { IsInt, IsNotEmpty, Max, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib'

export class Level extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10)
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
