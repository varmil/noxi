// eslint-disable-next-line no-restricted-imports
import dayjs from 'dayjs'
import durationPlugin, { Duration } from 'dayjs/plugin/duration'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import toArray from 'dayjs/plugin/toArray'

dayjs.extend(durationPlugin)
dayjs.extend(toArray)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export default dayjs

export const humanizeDuration = (ISO_8601: string | Duration) => {
  let d: Duration
  if (typeof ISO_8601 === 'string') {
    d = dayjs.duration(ISO_8601)
  } else {
    d = ISO_8601
  }

  const hours = d.hours()
  return d.format([hours && 'H', 'mm', 'ss'].filter(Boolean).join(':').trim())
}
