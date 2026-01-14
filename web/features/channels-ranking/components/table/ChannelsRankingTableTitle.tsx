'use client'

import { PropsWithChildren } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import PeriodHoverCardFactory from 'components/ranking/hover-card/RankingPeriodHoverCardFactory'
import {
  RankingTableTitleContainer,
  RankingTableTitleDescription,
  RankingTableTitleH1
} from 'components/ranking/table/title/RankingTableTitle'
import { RealtimeStatusBadge } from 'components/styles/badge/RealtimeStatusBadge'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'
import { getPeriodDisplayName } from 'features/channels-ranking/utils/formatSnapshotPeriod'
import useQueryString from 'hooks/useQueryString'
import { usePathname } from 'lib/navigation'
import { Gender } from 'types/gender'
import { ChannelsRankingPeriod } from 'types/period'

type Props = PropsWithChildren<{
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  groupName: string
  gender?: Gender
  /** ISO 8601 文字列（Server → Client で Date はシリアライズ不可のため） */
  date: string
  className?: string
}>

export default function ChannelsRankingTableTitle({
  dimension,
  period,
  groupName,
  gender,
  date,
  className
}: Props) {
  const global = useTranslations('Global')
  const feat = useTranslations('Features.channelsRanking')
  const page = useTranslations('Page.ranking.channels')
  const locale = useLocale() as 'ja' | 'en'
  const periodName = getPeriodDisplayName(
    period,
    (key: string) => global(key as never),
    locale
  )
  const title = feat(`ranking.dimension.${dimension}`, {
    period: periodName,
    group: groupName,
    gender: gender ? global(`gender.${gender}`) : ''
  })
    .replace(/\s+/g, ' ')
    .trim()
  const pathname = usePathname()
  const { createQueryString } = useQueryString()
  return (
    <RankingTableTitleContainer className={className}>
      <section className="space-y-2">
        <RankingTableTitleH1 title={title} />
        <RankingTableTitleDescription>
          {page(`metadata.description.dimension.${dimension}`, {
            period: periodName,
            group: groupName,
            gender: gender ? global(`gender.${gender}`) : ''
          })}
        </RankingTableTitleDescription>
      </section>

      <div className="flex items-baseline gap-x-3">
        <PeriodHoverCardFactory
          type="channels"
          period={period}
          date={new Date(date)}
        />
        {period === 'last24Hours' && (
          <RealtimeStatusBadge
            href={`${pathname}${createQueryString('date', null)}`}
            date={new Date(date)}
          />
        )}
      </div>
    </RankingTableTitleContainer>
  )
}
