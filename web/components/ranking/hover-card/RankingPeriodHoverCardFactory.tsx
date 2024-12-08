import { PropsWithChildren } from 'react'
import PeriodHoverCard from 'components/ranking/hover-card/period/PeriodHoverCard'
import { RankingPeriod } from 'types/ranking'
import { getEndOf, getStartOf, getUpdatedAt } from 'utils/ranking/ranking'

type Props = PropsWithChildren<{
  period: RankingPeriod
  date?: Date
  className?: string
}>

export default function PeriodHoverCardFactory({
  period,
  date,
  children
}: Props) {
  if (period === 'all') return null

  return (
    <PeriodHoverCard
      start={getStartOf(period, date)}
      end={getEndOf(period, date)}
      updatedAt={getUpdatedAt(period, date)}
    />
  )
}
