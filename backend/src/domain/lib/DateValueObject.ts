import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { ValueObject } from '@domain/lib/ValueObject'

dayjs.extend(isToday)
dayjs.extend(utc)
dayjs.extend(timezone)

export abstract class DateValueObject extends ValueObject<Date> {
  format = (template?: string) => {
    return dayjs(this.val).format(template)
  }

  isToday = () => {
    return dayjs(this.val).isToday()
  }
  isNotToday = () => !this.isToday()

  protected subtractBy = (value: number) => {
    return dayjs(this.val).subtract(value, 'd').toDate()
  }
  protected addBy = (value: number) => {
    return dayjs(this.val).add(value, 'd').toDate()
  }

  formatToFullJapaneseDateTime = () =>
    dayjs(this.val).tz('Asia/Tokyo').format('YYYY年M月D日 HH:mm:ss')
}
