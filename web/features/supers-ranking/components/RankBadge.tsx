import { JSX } from 'react'
import { Crown } from 'lucide-react'

export default function RankBadge({ rank }) {
  let badgeClass =
    'flex w-16 h-16 rounded-full items-center justify-center text-2xl font-bold relative overflow-hidden'
  const iconClass = 'absolute top-1 right-1 w-6 h-6 animate-wiggle'
  let icon: JSX.Element | undefined
  let ariaLabel: string

  switch (rank) {
    case 1:
      badgeClass += ' bg-gold text-black'
      icon = <Crown className={iconClass} />
      ariaLabel = '1位 金メダル'
      break
    case 2:
      badgeClass += ' bg-silver text-black'
      // icon = <Star className={iconClass} />
      ariaLabel = '2位 銀メダル'
      break
    case 3:
      badgeClass += ' bg-bronze text-white'
      // icon = <Medal className={iconClass} />
      ariaLabel = '3位 銅メダル'
      break
    default:
      badgeClass += ' text-secondary-foreground'
      ariaLabel = `${rank}位`
  }

  return (
    <div className={badgeClass} aria-label={ariaLabel}>
      {rank}
      {icon}
    </div>
  )
}
