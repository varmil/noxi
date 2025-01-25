import { useTranslations } from 'next-intl'

type Props = {
  count: string | number | undefined
}

export default function Watched({ count }: Props) {
  const t = useTranslations('Components.styles')

  if (!count) count = 0

  if (typeof count === 'string') {
    count = Number(count)
  }

  return <>{t('watched', { count: count ? count.toLocaleString() : '--' })}</>
}
