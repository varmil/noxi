import { IsNotEmpty, IsIn } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo'

export class Period extends StringValueObject {
  @IsNotEmpty()
  @IsIn([
    'last24Hours',
    'last7Days',
    'last30Days',
    'last90Days',
    'last1Year',
    'thisWeek',
    'thisMonth',
    'thisYear'
  ])
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
