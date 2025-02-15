import { ForwardRefExoticComponent, RefAttributes } from 'react'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  LucideProps
} from 'lucide-react'
import { useTranslations } from 'next-intl'

type Props = {
  /** 今回の順位 */
  current?: number
  /** 前回の順位 */
  previous?: number
  /** 今回の母数 */
  totalNumber: number
  /** 集計中 */
  counting?: boolean
  className?: string
}
export default function ComparedToPreviousPeriod({
  current,
  previous,
  totalNumber,
  counting,
  className
}: Props) {
  const feat = useTranslations('Features.supersRanking')
  if (counting) {
    return (
      <span className="text-xs text-muted-foreground">{feat('counting')}</span>
    )
  }

  let Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  let color: string, label: string
  let diff: number = 0

  // CASE: 前回：圏外　今回：圏内
  // →　母数 - 今回の順位
  if (previous === undefined && current !== undefined) {
    diff = totalNumber - current
  }
  // CASE: 前回：圏内　今回：圏外
  // →　前回の順位 - 母数
  else if (previous !== undefined && current === undefined) {
    diff = previous - totalNumber
  }
  // CASE: 前回：圏外　今回：圏外
  // →　変化なしとする
  else if (previous === undefined && current === undefined) {
    diff = 0
  }
  // CASE: 前回：圏内　今回：圏内
  // →　前回の順位 - 今回の順位
  else if (previous && current) {
    diff = previous - current
  }

  switch (true) {
    case diff > 0:
      Icon = ArrowUpIcon
      color = 'text-green-500'
      label = '上昇'
      break
    case diff < 0:
      Icon = ArrowDownIcon
      color = 'text-red-500'
      label = '下降'
      break
    case diff === 0:
      Icon = MinusIcon
      color = 'text-green-500'
      label = '維持'
      break
    default:
      return null
  }

  return (
    <span
      className={`flex items-center ${color} text-sm font-medium ${
        className ?? ''
      }`}
    >
      <Icon className="w-4 h-4 mr-1" aria-label={label} />
      {diff !== 0 ? diff : ''}
    </span>
  )
}
