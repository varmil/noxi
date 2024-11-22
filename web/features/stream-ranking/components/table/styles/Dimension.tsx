import { useTranslations } from 'next-intl'
import { Progress } from '@/components/ui/progress'

export default function Dimension({
  className,
  dividend,
  divisor
}: {
  className?: string
  dividend?: number
  divisor: number
}) {
  const t = useTranslations('Features.streamRanking')
  return (
    <div className={`max-w-60 tabular-nums ${className || ''}`}>
      <span className="font-bold">{dividend?.toLocaleString() ?? '--'}</span>
      <div>
        <Progress
          title={t('viewers')}
          className="h-1"
          value={Math.round(((dividend ?? 0) / divisor) * 100)}
        />
      </div>
    </div>
  )
}
