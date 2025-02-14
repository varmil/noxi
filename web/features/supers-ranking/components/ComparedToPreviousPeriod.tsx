import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

type Props = {
  direction: 'up' | 'down'
  value: number
  className?: string
}
export default function ComparedToPreviousPeriod({
  direction,
  value,
  className
}: Props) {
  const feat = useTranslations('Features.supersRanking')
  // TODO: 実装
  {
    return <span className="text-xs text-green-500">{feat('counting')}</span>
  }

  const Icon = direction === 'up' ? ArrowUpIcon : ArrowDownIcon
  const color = direction === 'up' ? 'text-green-500' : 'text-red-500'

  return (
    <span
      className={`flex items-center ${color} text-sm font-medium ${
        className ?? ''
      }`}
    >
      <Icon
        className="w-4 h-4 mr-1"
        aria-label={direction === 'up' ? '上昇' : '下降'}
      />
      {value}
    </span>
  )
}
