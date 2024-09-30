import { DateTimeFormatOptions, useFormatter } from 'next-intl'

export const useFormattedDatetime = (date?: Date) => {
  const format = useFormatter()
  if (!date) return undefined
  return format.dateTime(date, {
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  })
}

export const FormatForTick: DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false
}
