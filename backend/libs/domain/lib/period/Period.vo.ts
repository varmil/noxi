import { IsNotEmpty, IsIn } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo'

export const PeriodStrings = [
  'last24Hours',
  'last7Days',
  'last30Days',
  'last90Days',
  'last1Year',
  'thisWeek',
  'thisMonth',
  'thisYear'
] as const
export type PeriodString = (typeof PeriodStrings)[number]

export class Period extends StringValueObject {
  @IsNotEmpty()
  @IsIn(PeriodStrings)
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }

  isLast24Hours(): boolean {
    return this.val === 'last24Hours'
  }
}
