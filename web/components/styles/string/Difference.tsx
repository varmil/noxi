import { ForwardRefExoticComponent, RefAttributes } from 'react'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  LucideProps
} from 'lucide-react'

type Props = {
  diff: number
  isPercent?: boolean
  className?: string
}
export default function Difference({ diff, isPercent, className }: Props) {
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

  return (
    <span
      className={`flex items-center font-medium ${color} ${className ?? ''}`}
    >
      <Icon className={`w-4 h-4 mr-1`} aria-label={label} />
      {text}
    </span>
  )
}
