import { ForwardRefExoticComponent, RefAttributes } from 'react'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  LucideProps
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Period } from 'types/period'

type Props = {
  diff: number
  isPercent?: boolean
  period?: Period
  className?: string
}
export default function Difference({
  diff,
  isPercent,
  period,
  className
}: Props) {
  const comp = useTranslations('Components.styles.string.difference')

  let Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  let color: string, label: string

  switch (true) {
    case diff > 0:
      Icon = ArrowUpIcon
      color = 'text-green-800 dark:text-green-500'
      label = '順位上昇'
      break
    case diff < 0:
      Icon = ArrowDownIcon
      color = 'text-red-700 dark:text-red-500'
      label = '順位下降'
      break
    case diff === 0:
      Icon = MinusIcon
      color = 'text-green-800 dark:text-green-500'
      label = '順位維持'
      break
    default:
      return null
  }

  let text = ''
  if (!isFinite(diff)) {
    text = isPercent ? `∞%` : `∞`
  } else if (diff !== 0) {
    text = isPercent ? `${diff.toFixed(1)}%` : `${diff}`
  }

  const Component = () => (
    <div className={`flex items-center font-medium ${color}`}>
      <Icon className={`size-4 mr-1`} aria-label={label} />
      {text}
    </div>
  )

  if (period) {
    if (
      period !== 'last24Hours' &&
      period !== 'last7Days' &&
      period !== 'last30Days' &&
      period !== 'last1Year'
    )
      return null
    return (
      <div className={className}>
        <span className="flex items-center text-sm text-muted-foreground gap-x-2">
          {comp.rich(period, { diff: () => <Component /> })}
        </span>
      </div>
    )
  } else {
    return (
      <div className={className}>
        <Component />
      </div>
    )
  }
}
