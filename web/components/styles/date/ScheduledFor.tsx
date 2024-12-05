import { useFormatter, useTranslations } from 'next-intl'

type Props = {
  date?: string | Date
}

export default function ScheduledFor({ date }: Props) {
  const format = useFormatter()
  const t = useTranslations('Components.styles')

  if (!date) return null

  if (typeof date === 'string') {
    date = new Date(date)
  }

  return (
    <>
      {t('scheduledFor', {
        datetime: format.dateTime(date, {
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          hourCycle: 'h23'
        })
      })}
    </>
  )
}
