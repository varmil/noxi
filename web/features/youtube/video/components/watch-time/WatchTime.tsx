import { useTranslations } from 'next-intl'
import { asHours } from 'lib/dayjs'

export default function WatchTime({
  duration,
  viewCount
}: {
  duration: string
  viewCount: number
}) {
  const t = useTranslations('Features.youtube.video')
  const watchTime = Math.round(asHours(duration) * viewCount)
  const style =
    watchTime > 2000 * 1000 ? 'text-primary font-bold' : 'text-muted-foreground'

  return (
    <div className="text-xs text-center">
      <div className="pb-0.5 text-muted-foreground">{t('watchTime')}</div>
      <div>
        <span className={style}>{watchTime.toLocaleString()} h</span>
      </div>
    </div>
  )
}
