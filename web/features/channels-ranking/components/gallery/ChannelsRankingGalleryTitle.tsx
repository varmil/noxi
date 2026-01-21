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
import { SwitchTabs } from 'components/switch-tabs/SwitchTabs'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'
import { getPeriodDisplayName } from 'features/channels-ranking/utils/formatSnapshotPeriod'
import useQueryString from 'hooks/useQueryString'
import { usePathname } from 'lib/navigation'
import { Gender } from 'types/gender'
import { ChannelsRankingPeriod, StreamRankingPeriod } from 'types/period'

/** Channels → Live 遷移時の period フォールバック */
function getStreamPeriodFromChannelsPeriod(
  period: ChannelsRankingPeriod
): StreamRankingPeriod {
  // 共通の period はそのまま維持
  const commonPeriods: StreamRankingPeriod[] = [
    'last24Hours',
    'last7Days',
    'last30Days'
  ]
  if (commonPeriods.includes(period as StreamRankingPeriod)) {
    return period as StreamRankingPeriod
  }
  // Channels 固有の period は last30Days にフォールバック
  return 'last30Days'
}

type Props = PropsWithChildren<{
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  group: string
  groupName: string
  gender?: Gender
  /** ISO 8601 文字列（Server → Client で Date はシリアライズ不可のため） */
  date: string
  className?: string
}>

export default function ChannelsRankingGalleryTitle({
  dimension,
  period,
  group,
  groupName,
  gender,
  date,
  className
}: Props) {
  const global = useTranslations('Global')
  const feat = useTranslations('Features.channelsRanking')
  const page = useTranslations('Page.ranking.channels')
  const t = useTranslations('Components.ranking.aggregationSwitch')
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

  // super-chat の場合のみ SwitchTabs を表示
  const showSwitchTabs = dimension === 'super-chat'
  const livePeriod = getStreamPeriodFromChannelsPeriod(period)
  const genderParam = gender ? `?gender=${gender}` : ''

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

      <div className="flex flex-col gap-y-4 sm:gap-y-2 sm:items-end">
        <div className="flex items-baseline gap-x-3">
          <PeriodHoverCardFactory
            type="channels"
            period={period}
            date={date}
            className="mr-1" // SwitchTabs と見た目の端を合わせる
          />
          {period === 'last24Hours' && (
            <RealtimeStatusBadge
              href={`${pathname}${createQueryString('date', null)}`}
              date={new Date(date)}
            />
          )}
        </div>
        {showSwitchTabs && (
          <SwitchTabs
            className="self-end -mb-3 -mr-3 sm:mb-0 sm:mr-0"
            tabs={[
              {
                label: t('channels'),
                href: `/ranking/super-chat/channels/${group}/${period}${genderParam}`
              },
              {
                label: t('live'),
                href: `/ranking/super-chat/live/${group}/${livePeriod}${genderParam}`
              }
            ]}
          />
        )}
      </div>
    </RankingTableTitleContainer>
  )
}
