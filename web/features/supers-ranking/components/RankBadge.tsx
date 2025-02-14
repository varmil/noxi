import { JSX } from 'react'
import { Crown } from 'lucide-react'
import { useTranslations } from 'next-intl'

type Props = { rank?: number }

export default function RankBadge({ rank }: Props) {
  const global = useTranslations('Global')

  if (!rank) return <UnrankedBadge />

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
    <div className="flex items-baseline justify-center space-x-1">
      <div className={badgeClass} aria-label={ariaLabel}>
        {rank}
        {icon}
      </div>

      <span className="text-muted-foreground">
        {global(`ranking.place`, { rank })}
      </span>
    </div>
  )
}

function UnrankedBadge() {
  const feat = useTranslations('Features.supersRanking')
  return (
    <div className="flex w-16 h-16 items-center justify-center text-muted-foreground">
      {feat('unranked')}
    </div>
  )
}
