import { PropsWithChildren } from 'react'
import { RankingPeriod } from 'types/ranking'
import Last24HoursHoverCard from 'components/ranking/hover-card/period/Last24HoursHoverCard'
import PeriodHoverCard from 'components/ranking/hover-card/period/PeriodHoverCard'
import dayjs from 'lib/dayjs'
import { getEndOf, getStartOf } from 'utils/ranking/ranking'

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

  // 時間「幅」があるかどうかでコンポーネントを出し分ける
  if (period === 'last24Hours') {
    return <Last24HoursHoverCard date={date} />
  } else {
    const start = getStartOf(period)
    const end = getEndOf(period)
    return <PeriodHoverCard start={start} end={end} date={date} />
  }
}
