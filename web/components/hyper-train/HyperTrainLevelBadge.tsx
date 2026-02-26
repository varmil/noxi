import { getLevelBgColor } from 'components/hyper-train/train-styles'

type Props = {
  level: number
  size?: 'sm' | 'md' | 'lg'
}

export function HyperTrainLevelBadge({ level, size = 'md' }: Props) {
  const bgColor = getLevelBgColor(level)
  const sizeClass = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-0.5',
    lg: 'text-3xl px-6 py-2 font-bold'
  }[size]

  return (
    <span
      className={`inline-flex items-center rounded-full text-white font-semibold ${bgColor} ${sizeClass}`}
    >
      Lv.{level}
    </span>
  )
}
