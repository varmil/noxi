import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Link } from 'lib/navigation'

// 1時間未満であればリアルタイム扱い
const IS_LIVE_THRESHOLD = 1

type RealtimeStatusBadgeProps = {
  date?: Date
  /** 過去データをクリックした際のURL */
  href?: string
  className?: string
}

export function RealtimeStatusBadge({
  date,
  href,
  className
}: RealtimeStatusBadgeProps) {
  const comp = useTranslations('Components.styles.badge')

  // dateがundefinedの場合はリアルタイム扱い
  let isLive = !date

  // dateが指定されている場合、現在時刻と比較
  // IS_LIVE_THRESHOLD時間未満であればリアルタイム扱い
  if (date) {
    const targetDate = date
    const currentDate = new Date()
    const diffInHours =
      (currentDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60)
    isLive = diffInHours < IS_LIVE_THRESHOLD
  }

  const content = (
    <>
      <span
        className={cn(
          'relative flex h-2 w-2 mr-2',
          isLive ? 'text-green-500' : 'text-zinc-500'
        )}
      >
        <span
          className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            isLive ? 'bg-green-500' : 'bg-transparent'
          )}
        />
        <span
          className={cn(
            'relative inline-flex rounded-full h-2 w-2',
            isLive ? 'bg-green-500' : 'bg-zinc-500'
          )}
        />
      </span>
      <span className="text-nowrap">
        {isLive ? comp('realtime') : comp('past')}
      </span>
    </>
  )

  const badgeClasses = cn(
    'font-light cursor-default',
    isLive ? '' : 'hover:bg-zinc-300 cursor-pointer',
    className
  )

  if (isLive || !href) {
    return (
      <Badge
        variant={isLive ? 'outline' : 'secondary'}
        className={badgeClasses}
      >
        {content}
      </Badge>
    )
  }

  return (
    <Link href={href}>
      <Badge
        variant="secondary"
        className={badgeClasses}
        aria-label={comp('labelForRealtime')}
      >
        {content}
      </Badge>
    </Link>
  )
}
