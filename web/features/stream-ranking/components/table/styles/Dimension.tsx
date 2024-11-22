import { useTranslations } from 'next-intl'
import { Progress } from '@/components/ui/progress'

/** text + progress bar */
export default function Dimension({
  active,
  className,
  dividend,
  divisor
}: {
  active?: boolean
  className?: string
  dividend?: number
  divisor: number
}) {
  const t = useTranslations('Features.streamRanking')
  const textClasses = active ? 'font-bold' : 'text-muted-foreground'
  const barColor = active ? '' : '[&>*]:bg-muted-foreground'

  return (
    <div className={`max-w-60 tabular-nums ${className || ''}`}>
      <span className={textClasses}>{dividend?.toLocaleString() ?? '--'}</span>
      <div>
        <Progress
          title={t('viewers')}
          className={`h-1 ${barColor}`}
          value={Math.round(((dividend ?? 0) / divisor) * 100)}
        />
      </div>
    </div>
  )
}
