import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

type Props = {
  direction: 'up' | 'down'
  value: number
}
export default function ComparedToPreviousPeriod({ direction, value }: Props) {
  const Icon = direction === 'up' ? ArrowUpIcon : ArrowDownIcon
  const color = direction === 'up' ? 'text-green-500' : 'text-red-500'

  return (
    <span className={`flex items-center ${color} text-sm font-medium`}>
      <Icon
        className="w-4 h-4 mr-1"
        aria-label={direction === 'up' ? '上昇' : '下降'}
      />
      {value}
    </span>
  )
}
