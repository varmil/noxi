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
  hideText?: boolean
  size?: 'xs' | 'sm'
  className?: string
}
export default function Difference({
  diff,
  isPercent,
  hideText,
  size = 'sm',
  className
}: Props) {
  let Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  let color: string, label: string

  switch (true) {
    case diff > 0:
      Icon = ArrowUpIcon
      color = 'text-green-500'
      label = '順位上昇'
      break
    case diff < 0:
      Icon = ArrowDownIcon
      color = 'text-red-500'
      label = '順位下降'
      break
    case diff === 0:
      Icon = MinusIcon
      color = 'text-green-500'
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

  const textSize = size === 'xs' ? 'text-xs' : 'text-sm font-medium'
  const iconSize = size === 'xs' ? 'w-3 h-3' : 'w-4 h-4'

  return (
    <span
      className={`flex items-center ${color} ${textSize} ${className ?? ''}`}
    >
      <Icon
        className={`${iconSize} ${hideText ? '' : 'mr-1'}`}
        aria-label={label}
      />
      {hideText ? null : text}
    </span>
  )
}
