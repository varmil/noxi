import { PropsWithChildren } from 'react'
import PeriodHoverCard from 'components/ranking/hover-card/period/PeriodHoverCard'
import { ChannelsRankingPeriod, StreamRankingPeriod } from 'types/period'
import { getEndOf, getStartOf, getUpdatedAt } from 'utils/ranking/ranking'

type Props = PropsWithChildren<{
  period: ChannelsRankingPeriod | StreamRankingPeriod
  date?: Date
  className?: string
}>

export default function PeriodHoverCardFactory({ period, date }: Props) {
  if (period === 'all' || period === 'realtime') return null

  return (
    <PeriodHoverCard
      start={getStartOf(period, date)}
      end={getEndOf(period, date)}
      updatedAt={getUpdatedAt(period, date)}
    />
  )
}
