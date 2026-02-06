import { IsInt, IsNotEmpty, Max, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib'

export class LoginCount extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2)
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
