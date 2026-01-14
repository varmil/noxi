import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import PeriodHoverCard from 'components/ranking/hover-card/period/PeriodHoverCard'
import { ChannelsRankingPeriod, Period, StreamRankingPeriod } from 'types/period'
import { getEndOf, getStartOf, getUpdatedAt } from 'utils/period/ranking'

type Props = PropsWithChildren<{
  type: 'channels' | 'mostCheered' | 'topFans' | 'live'
  period: ChannelsRankingPeriod | StreamRankingPeriod
  /** ISO 8601 文字列 */
  date: string
  className?: string
}>

export default function PeriodHoverCardFactory({ type, period, date }: Props) {
  const comp = useTranslations('Components.ranking.hoverCard')

  // スナップショット期間やwholePeriod, realtimeはホバーカード不要
  if (
    period === 'wholePeriod' ||
    period === 'realtime' ||
    period.startsWith('weekly-') ||
    period.startsWith('monthly-')
  ) {
    return null
  }

  const regularPeriod = period as Period
  const dateObj = new Date(date)

  let updatedAt: string | undefined
  let criteriaDescription = ''
  switch (type) {
    case 'channels':
      updatedAt = getUpdatedAt(regularPeriod, dateObj).toISOString()
      criteriaDescription = comp('criteriaDescription.channels')
      break
    case 'live':
      criteriaDescription = comp('criteriaDescription.live')
      break
    case 'mostCheered':
      criteriaDescription = comp('criteriaDescription.mostCheered')
      break
    case 'topFans':
      criteriaDescription = comp('criteriaDescription.topFans')
      break

    default:
      break
  }

  return (
    <div className="flex items-baseline gap-x-3">
      <PeriodHoverCard
        start={getStartOf(regularPeriod, dateObj).toISOString()}
        end={getEndOf(regularPeriod, dateObj).toISOString()}
        updatedAt={updatedAt}
        criteriaDescription={criteriaDescription}
      />
    </div>
  )
}
