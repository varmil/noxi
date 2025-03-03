import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { MinusIcon, LucideProps, ChevronUp, ChevronDown } from 'lucide-react'

type Props = {
  diff: number
  className?: string
}

/** 一覧ページなどで使う */
export default function DifferenceMini({ diff, className }: Props) {
  let Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  let color: string, label: string

  switch (true) {
    case diff > 0:
      Icon = ChevronUp
      color = 'text-green-500'
      label = '順位上昇'
      break
    case diff < 0:
      Icon = ChevronDown
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

  return (
    <span className={`flex items-center ${color} ${className ?? ''}`}>
      <Icon className={`w-3 h-3 sm:stroke-3`} aria-label={label} />
    </span>
  )
}
