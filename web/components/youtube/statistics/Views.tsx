import { useFormatter, useTranslations } from 'next-intl'

/** X回視聴 / X views */
export default function Views({ views }: { views: number }) {
  const format = useFormatter()
  const t = useTranslations('Features.youtube.video')

  return (
    <>
      {t('views', {
        count: format.number(views, { notation: 'compact' })
      })}
    </>
  )
}
