import { IsInt, IsNotEmpty } from 'class-validator'
import { NumberValueObject } from '@domain/lib'

export class Count extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  public readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
