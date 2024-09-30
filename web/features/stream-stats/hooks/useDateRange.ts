import { useFormattedDatetime } from 'features/stream-stats/hooks/useFormattedDatetime'

export const useDateRange = (start?: string, end?: string) => {
  return [
    useFormattedDatetime(start ? new Date(start) : undefined),
    '-',
    useFormattedDatetime(end ? new Date(end) : undefined)
  ]
}
