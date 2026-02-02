import { Exclude } from 'class-transformer'
import dayjs, { extend } from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isoWeek from 'dayjs/plugin/isoWeek'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { ValueObject } from '@domain/lib/vo/ValueObject'

extend(isToday)
extend(utc)
extend(timezone)
extend(isoWeek)

export abstract class DateValueObject extends ValueObject<Date> {
  @Exclude()
  startOfWeek = () =>
    dayjs(this.val).tz('Asia/Tokyo').startOf('isoWeek').toDate()

  @Exclude()
  startOfMonth = () =>
    dayjs(this.val).tz('Asia/Tokyo').startOf('month').toDate()

  @Exclude()
  startOfYear = () =>
    dayjs(this.val).tz('Asia/Tokyo').startOf('year').toDate()

  @Exclude()
  xDaysAgo = (x: number) => dayjs(this.val).subtract(x, 'd').toDate()

  @Exclude()
  xYearsAgo = (x: number) => dayjs(this.val).subtract(x, 'y').toDate()

  /**
   * JST基準で前日の終わり（23:59:59.999）を返す
   * 深夜バッチで「前日」を基準に集計する際に使用
   *
   * 例: 2026-01-01 03:00 JST に実行した場合
   *   → 2025-12-31 23:59:59 JST (= 2025-12-31 14:59:59 UTC) を返す
   */
  @Exclude()
  endOfYesterdayJST = () =>
    dayjs(this.val)
      .tz('Asia/Tokyo')
      .subtract(1, 'd')
      .endOf('day')
      .toDate()
}
