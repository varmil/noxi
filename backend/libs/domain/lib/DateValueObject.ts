import dayjs, { extend } from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { ValueObject } from '@domain/lib/ValueObject'

extend(isToday)
extend(utc)
extend(timezone)

export abstract class DateValueObject extends ValueObject<Date> {
  format = (template?: string) => {
    return dayjs(this.val).format(template)
  }

  isToday = () => {
    return dayjs(this.val).isToday()
  }
  isNotToday = () => !this.isToday()

  isWithin30Days = () => {
    const now = new Date()
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(now.getMonth() - 1)
    return this.val > oneMonthAgo
  }

  protected subtractBy = (value: number) => {
    return dayjs(this.val).subtract(value, 'd').toDate()
  }
  protected addBy = (value: number) => {
    return dayjs(this.val).add(value, 'd').toDate()
  }
}
