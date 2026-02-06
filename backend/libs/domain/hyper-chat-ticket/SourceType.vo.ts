import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib'

export const SOURCE_TYPE = {
  RELEASE: 'release',
  SIGNUP: 'signup',
  LOGIN_BONUS: 'loginBonus'
} as const

export const SOURCE_TYPES = Object.values(SOURCE_TYPE)
export type SourceTypeValue = (typeof SOURCE_TYPE)[keyof typeof SOURCE_TYPE]

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
