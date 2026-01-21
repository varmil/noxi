import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import PeriodHoverCard from 'components/ranking/hover-card/period/PeriodHoverCard'
import dayjs from 'lib/dayjs'
import {
  ChannelsRankingPeriod,
  Period,
  StreamRankingPeriod
} from 'types/period'
import { getEndOf, getStartOf, getUpdatedAt } from 'utils/period/ranking'

type Props = PropsWithChildren<{
  type: 'channels' | 'mostCheered' | 'topFans' | 'live'
  period: ChannelsRankingPeriod | StreamRankingPeriod
  /** ISO 8601 文字列 */
  date: string
  className?: string
}>

export default function PeriodHoverCardFactory({
  type,
  period,
  date,
  className
}: Props) {
  const comp = useTranslations('Components.ranking.hoverCard')

  // スナップショット期間やwholePeriod, realtimeはホバーカード不要
  // gap-y を効かせたいので仕方なく空のdivを返す
  if (
    period === 'wholePeriod' ||
    period === 'realtime' ||
    period.startsWith('weekly-') ||
    period.startsWith('monthly-')
  ) {
    return <div />
  }

  const regularPeriod = period as Period

  let updatedAt: dayjs.Dayjs | undefined
  let criteriaDescription = ''
  switch (type) {
    case 'channels':
      updatedAt = getUpdatedAt(regularPeriod, date)
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
    <div className={`flex items-baseline gap-x-3 ${className || ''}`}>
      <PeriodHoverCard
        start={getStartOf(regularPeriod, date)}
        end={getEndOf(regularPeriod, date)}
        updatedAt={updatedAt}
        criteriaDescription={criteriaDescription}
      />
    </div>
  )
}
