import { IsNotEmpty, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib'

export class Count extends NumberValueObject {
  @IsNotEmpty()
  @Min(1)
  public readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
