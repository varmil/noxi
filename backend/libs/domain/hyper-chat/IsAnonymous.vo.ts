import { IsNotEmpty } from 'class-validator'
import { BooleanValueObject } from '@domain/lib'

export class IsAnonymous extends BooleanValueObject {
  @IsNotEmpty()
  public readonly val: boolean

  constructor(val?: boolean | null) {
    const resolved = val ?? false
    super(resolved)
    this.val = resolved
  }
}
