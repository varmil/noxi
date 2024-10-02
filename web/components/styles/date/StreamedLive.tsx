import { useFormatter, useTranslations } from 'next-intl'

type Props = {
  date: string | Date
}

export default function StreamedLive({ date }: Props) {
  const format = useFormatter()
  const t = useTranslations('Components.styles')

  if (typeof date === 'string') {
    date = new Date(date)
  }

  return (
    <>
      {t('streamedLive', {
        datetime: format.relativeTime(date)
      })}
    </>
  )
}
