import { IsNotEmpty, IsIn } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo'

export const IntervalStrings = [
  'daily',
  'weekly',
  'monthly',
  'yearly'
] as const
export type IntervalString = (typeof IntervalStrings)[number]

export class Interval extends StringValueObject {
  @IsNotEmpty()
  @IsIn(IntervalStrings)
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }

  toDateTrunc(): string {
    const map: Record<IntervalString, string> = {
      daily: 'day',
      weekly: 'week',
      monthly: 'month',
      yearly: 'year'
    }
    return map[this.val as IntervalString]
  }
}
