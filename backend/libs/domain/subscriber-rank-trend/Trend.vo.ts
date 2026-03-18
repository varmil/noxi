import { IsIn, IsNotEmpty } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export type TrendValue = 'upward' | 'downward' | 'stable'

export class Trend extends StringValueObject {
  @IsNotEmpty()
  @IsIn(['upward', 'downward', 'stable'])
  protected readonly val: string

  constructor(val: TrendValue) {
    super(val)
    this.val = val
  }
}
