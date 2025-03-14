'use client'

import { PropsWithChildren } from 'react'
import { ChartNoAxesColumnIncreasing } from 'lucide-react'
import { useTranslations } from 'next-intl'
import PeriodHoverCardFactory from 'components/ranking/hover-card/RankingPeriodHoverCardFactory'
import { RealtimeStatusBadge } from 'components/styles/badge/RealtimeStatusBadge'
import { GroupString } from 'config/constants/Group'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'
import useQueryString from 'hooks/useQueryString'
import { usePathname } from 'lib/navigation'
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
  const pathname = usePathname()
  const { createQueryString } = useQueryString()
  return (
    <section className={`flex ${className || ''}`}>
      <div className="flex flex-col gap-y-2 sm:w-full sm:flex-row sm:justify-between">
        <h1
          title={title}
          className="flex items-center text-lg sm:text-xl font-bold"
          aria-label={title}
        >
          <div className="flex gap-x-1 sm:gap-x-2 items-center">
            <span className="tracking-tighter line-clamp-1 break-all">
              {title}
            </span>
          </div>
        </h1>

        <div className="flex items-baseline gap-x-3">
          <PeriodHoverCardFactory period={period} date={date} />
          {period === 'last24Hours' && (
            <RealtimeStatusBadge
              href={`${pathname}?${createQueryString('date', null)}`}
              date={date}
            />
          )}
        </div>
      </div>
    </section>
  )
}
