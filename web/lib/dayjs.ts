// eslint-disable-next-line no-restricted-imports
import dayjs from 'dayjs'
import durationPlugin, { Duration } from 'dayjs/plugin/duration'
import isoWeek from 'dayjs/plugin/isoWeek'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import minMax from 'dayjs/plugin/minMax'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import toArray from 'dayjs/plugin/toArray'
import utc from 'dayjs/plugin/utc'

dayjs.extend(durationPlugin)
dayjs.extend(toArray)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isoWeek)
dayjs.extend(minMax)

export default dayjs

export const humanizeDuration = (ISO_8601: string | Duration) => {
  let d: Duration
  if (typeof ISO_8601 === 'string') {
    d = dayjs.duration(ISO_8601)
  } else {
    d = ISO_8601
  }

  // ミリ秒は無視する。secondsが小数点の場合がある
  const hours = d.hours()
  const minutes = dayjs
    .duration(Math.round(d.minutes()), 'minutes')
    .format('mm')
  const seconds = dayjs
    .duration(Math.round(d.seconds()), 'seconds')
    .format('ss')
  return [hours, minutes, seconds].filter(Boolean).join(':').trim()
}
