import { useFormattedDatetime } from 'features/stream-stats/hooks/useFormattedDatetime'

export const useDateRange = (start?: Date, end?: Date) => {
  return [
    useFormattedDatetime(start ?? undefined),
    '-',
    useFormattedDatetime(end ?? undefined)
  ]
}
