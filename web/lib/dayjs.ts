// eslint-disable-next-line no-restricted-imports
import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import toArray from 'dayjs/plugin/toArray'

dayjs.extend(durationPlugin)
dayjs.extend(toArray)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export default dayjs
