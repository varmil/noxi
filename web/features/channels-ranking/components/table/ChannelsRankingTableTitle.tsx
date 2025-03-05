import { PropsWithChildren } from 'react'
import { ChartNoAxesColumnIncreasing } from 'lucide-react'
import { useTranslations } from 'next-intl'
import PeriodHoverCardFactory from 'components/ranking/hover-card/RankingPeriodHoverCardFactory'
import { RealtimeStatusBadge } from 'components/styles/badge/RealtimeStatusBadge'
import { GroupString } from 'config/constants/Group'
import { ChannelsRankingDefaultUrl } from 'config/constants/RankingRoute'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'
import { Gender } from 'types/gender'
import { ChannelsRankingPeriod } from 'types/period'

type Props = PropsWithChildren<{
  dimension: ChannelsRankingDimension
  period: ChannelsRankingPeriod
  group?: GroupString
  gender?: Gender
  date?: Date
  className?: string
}>

export default function ChannelsRankingTableTitle({
  dimension,
  period,
  group,
  gender,
  date,
  className
}: Props) {
  const global = useTranslations('Global')
  const feat = useTranslations('Features.channelsRanking')
  const title = feat(`ranking.dimension.${dimension}`, {
    period: global(`period.${period}`),
    group: group ? global(`group.${group}`) : 'VTuber',
    gender: gender ? global(`gender.${gender}`) : ''
  })
    .replace(/\s+/g, ' ')
    .trim()
  return (
    <section className={`flex text-sm sm:text-base ${className || ''}`}>
      <ChartNoAxesColumnIncreasing className="w-6 h-6 mr-3" />

      <div className="flex flex-col gap-y-2 sm:w-full sm:flex-row sm:justify-between">
        <h1
          title={title}
          className="flex items-center font-bold"
          aria-label={title}
        >
          <div className="flex gap-x-1 sm:gap-x-2 items-center line-clamp-1">
            <span className="line-clamp-1">{title}</span>
          </div>
        </h1>

        <div className="flex items-baseline gap-x-3">
          <PeriodHoverCardFactory period={period} date={date} />
          {period === 'last24Hours' && (
            <RealtimeStatusBadge href={ChannelsRankingDefaultUrl} date={date} />
          )}
        </div>
      </div>
    </section>
  )
}
