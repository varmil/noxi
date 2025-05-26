import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import PeriodHoverCard from 'components/ranking/hover-card/period/PeriodHoverCard'
import dayjs from 'lib/dayjs'
import { ChannelsRankingPeriod, StreamRankingPeriod } from 'types/period'
import { getEndOf, getStartOf, getUpdatedAt } from 'utils/period/ranking'

type Props = PropsWithChildren<{
  type: 'channels' | 'mostCheered' | 'topFans'
  period: ChannelsRankingPeriod | StreamRankingPeriod
  date?: Date
  className?: string
}>

export default function PeriodHoverCardFactory({ type, period, date }: Props) {
  const comp = useTranslations('Components.ranking.hoverCard')

  if (period === 'all' || period === 'realtime') return null

  let updatedAt: dayjs.Dayjs | undefined
  let criteriaDescription = ''
  switch (type) {
    case 'channels':
      updatedAt = getUpdatedAt(period, date)
      criteriaDescription = comp('criteriaDescription.channels')
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
        start={getStartOf(period, date)}
        end={getEndOf(period, date)}
        updatedAt={updatedAt}
        criteriaDescription={criteriaDescription}
      />
    </div>
  )
}
