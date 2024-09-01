import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'

export default function DurationBadge({}: PropsWithoutRef<{}>) {
  const t = useTranslations('Features.stream')

  return (
    <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-0.5 rounded text-white text-xs">
      <span>{t('scheduledLabel')}</span>
    </div>
  )
}
