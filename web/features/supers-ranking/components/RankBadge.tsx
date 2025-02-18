import { JSX } from 'react'
import { Award, Crown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Underline from 'components/styles/string/Underline'

type Props = { rank?: number }

export default function RankBadge({ rank }: Props) {
  const global = useTranslations('Global')

  if (!rank) return <UnrankedBadge />

  let badgeClass =
    'flex min-w-14 h-16 items-center justify-center text-2xl font-bold relative'
  const iconClass =
    'absolute top-0 left-[52%] w-4 sm:w-5 h-4 sm:h-5 animate-wiggle'
  let icon: JSX.Element | undefined
  let ariaLabel: string

  switch (rank) {
    case 1:
      badgeClass += ''
      icon = <Crown className={`${iconClass} fill-gold stroke-gold`} />
      ariaLabel = '1位 金メダル'
      break
    case 2:
      badgeClass += ''
      icon = <Award className={`${iconClass} stroke-silver`} />
      ariaLabel = '2位 銀メダル'
      break
    case 3:
      badgeClass += ''
      icon = <Award className={`${iconClass} stroke-bronze`} />
      ariaLabel = '3位 銅メダル'
      break
    default:
      badgeClass += ''
      ariaLabel = `${rank}位`
  }

  return (
    <div className="flex items-baseline justify-center space-x-1">
      <div className={badgeClass} aria-label={ariaLabel}>
        {icon}
        <Underline>{rank}</Underline>
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
