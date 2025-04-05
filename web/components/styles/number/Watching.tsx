import { useTranslations } from 'next-intl'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'

type Props = {
  count: string | number | undefined
  compact?: boolean
}

export default function Watching({ count, compact }: Props) {
  const t = useTranslations('Components.styles')

  if (!count) count = 0

  if (typeof count === 'string') {
    count = Number(count)
  }

  return (
    <span className="line-clamp-1 break-all">
      {count ? (
        compact ? (
          <IntlNumberFormat>{count}</IntlNumberFormat>
        ) : (
          count.toLocaleString()
        )
      ) : (
        '--'
      )}{' '}
      {t('watching')}
    </span>
  )
}
