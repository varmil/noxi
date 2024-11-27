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
  startOfWeek = () => dayjs(this.val).startOf('isoWeek').toDate()

  @Exclude()
  startOfMonth = () => dayjs(this.val).startOf('month').toDate()

  @Exclude()
  startOfyear = () => dayjs(this.val).startOf('year').toDate()

  @Exclude()
  xDaysAgo = (x: number) => dayjs(this.val).subtract(x, 'd').toDate()

  @Exclude()
  xYearsAgo = (x: number) => dayjs(this.val).subtract(x, 'y').toDate()
}
