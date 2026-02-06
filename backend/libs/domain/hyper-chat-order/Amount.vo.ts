import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib'

export class Amount extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
