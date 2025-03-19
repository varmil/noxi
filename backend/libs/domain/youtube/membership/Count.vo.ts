import { NumberValueObject } from '@domain/lib'
import { IsNotEmpty, Min } from 'class-validator'

export class Count extends NumberValueObject {
  @IsNotEmpty()
  @Min(1)
  public readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
