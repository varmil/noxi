import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib'

export const SOURCE_TYPES = ['release', 'signup', 'login_bonus'] as const
export type SourceTypeValue = (typeof SOURCE_TYPES)[number]

export class SourceType extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @IsIn(SOURCE_TYPES)
  protected readonly val: SourceTypeValue

  constructor(val: SourceTypeValue) {
    super(val)
    this.val = val
  }
}
