import { IsIn, IsNotEmpty } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export const GenderStrings = ['male', 'female', 'nonbinary'] as const
export type GenderString = (typeof GenderStrings)[number]

export class Gender extends StringValueObject {
  static readonly Male = new Gender('male')
  static readonly Female = new Gender('female')
  static readonly Nonbinary = new Gender('nonbinary')

  @IsNotEmpty()
  @IsIn(GenderStrings)
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
