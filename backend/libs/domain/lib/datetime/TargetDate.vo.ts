import { DateValueObject } from '@domain/lib/vo'

/**
 * 任意の日付を表すValueObject
 * 集計基準日として使用する
 */
export class TargetDate extends DateValueObject {
  constructor(date: Date) {
    super(date)
  }
}
