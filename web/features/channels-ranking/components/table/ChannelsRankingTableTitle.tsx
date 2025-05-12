'use client'

import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import PeriodHoverCardFactory from 'components/ranking/hover-card/RankingPeriodHoverCardFactory'
import {
  RankingTableTitleContainer,
  RankingTableTitleH1
} from 'components/ranking/table/title/RankingTableTitle'
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
    <RankingTableTitleContainer className={className}>
      <RankingTableTitleH1 title={title} />

      <div className="flex items-baseline gap-x-3">
        <PeriodHoverCardFactory period={period} date={date} />
        {period === 'last24Hours' && (
          <RealtimeStatusBadge
            href={`${pathname}${createQueryString('date', null)}`}
            date={date}
          />
        )}
      </div>
    </RankingTableTitleContainer>
  )
}
