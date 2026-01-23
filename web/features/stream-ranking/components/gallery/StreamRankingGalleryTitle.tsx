'use client'

import { PropsWithChildren } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import PeriodHoverCardFactory from 'components/ranking/hover-card/RankingPeriodHoverCardFactory'
import {
  RankingTableTitleContainer,
  RankingTableTitleDescription,
  RankingTableTitleH1
} from 'components/ranking/table/title/RankingTableTitle'
import { SwitchTabs } from 'components/switch-tabs/SwitchTabs'
import { StreamRankingDimension } from 'features/stream-ranking/types/stream-ranking.type'
import { Gender } from 'types/gender'
import { ChannelsRankingPeriod, StreamRankingPeriod } from 'types/period'
import {
  formatSnapshotPeriod,
  isSnapshotPeriod
} from 'utils/period/snapshot-period'

/** Live → Channels 遷移時の period マッピング */
function getChannelsPeriodFromStreamPeriod(
  period: StreamRankingPeriod
): ChannelsRankingPeriod {
  // realtime は last24Hours にフォールバック
  if (period === 'realtime') {
    return 'last24Hours'
  }
  // その他はそのまま維持（共通の period）
  return period
}

type Props = PropsWithChildren<{
  dimension: StreamRankingDimension
  period: StreamRankingPeriod
  group: string
  groupName: string
  gender?: Gender
  /** ISO 8601 文字列 */
  date: string
  className?: string
}>

export default function StreamRankingGalleryTitle({
  dimension,
  period,
  group,
  groupName,
  gender,
  date,
  className
}: Props) {
  const locale = useLocale() as 'ja' | 'en'
  const global = useTranslations('Global')
  const feat = useTranslations('Features.streamRanking')
  const page = useTranslations('Page.ranking.live')
  const t = useTranslations('Components.ranking.aggregationSwitch')

  // スナップショット期間の場合はフォーマット、それ以外は翻訳キーを使用
  const periodName = isSnapshotPeriod(period)
    ? (formatSnapshotPeriod(period, locale) ?? period)
    : global(`period.${period}`)
  const periodKeyword = isSnapshotPeriod(period)
    ? periodName
    : global(`periodKeyword.${period}`)
  const periodInParens = period === 'realtime' ? '' : ` (${periodName})`
  const title = feat(`ranking.ui.${dimension}`, {
    period: periodName,
    periodKeyword,
    periodInParens,
    group: groupName,
    gender: gender ? global(`gender.${gender}`) : ''
  })
    .replace(/\s+/g, ' ')
    .trim()

  // concurrent-viewer は期間別ディスクリプション（スナップショット期間は汎用キー）、それ以外は従来通り
  const description = (() => {
    if (dimension === 'concurrent-viewer') {
      // スナップショット期間の場合は汎用キーを使用
      const descriptionKey = isSnapshotPeriod(period)
        ? period.startsWith('weekly-')
          ? 'weekly'
          : 'monthly'
        : period
      return page(
        `metadata.description.dimension.concurrent-viewer.${descriptionKey}` as Parameters<
          typeof page
        >[0],
        {
          period: periodName,
          group: groupName,
          gender: gender ? global(`gender.${gender}`) : ''
        }
      )
    }
    return page(
      `metadata.description.dimension.${dimension}` as 'metadata.description.dimension.super-chat',
      {
        period: periodName,
        group: groupName,
        gender: gender ? global(`gender.${gender}`) : ''
      }
    )
  })()

  // super-chat の場合のみ SwitchTabs を表示
  const showSwitchTabs = dimension === 'super-chat'
  const channelsPeriod = getChannelsPeriodFromStreamPeriod(period)
  const genderParam = gender ? `?gender=${gender}` : ''

  return (
    <RankingTableTitleContainer className={className}>
      <section className="space-y-2">
        <RankingTableTitleH1 title={title} />
        <RankingTableTitleDescription>
          {description}
        </RankingTableTitleDescription>
      </section>
      <div className="flex flex-col gap-y-4 sm:gap-y-2 sm:items-end">
        <PeriodHoverCardFactory
          type="live"
          period={period}
          date={date}
          className="mr-1" // SwitchTabs と見た目の端を合わせる
        />
        {showSwitchTabs && (
          <SwitchTabs
            className="self-end -mb-3 -mr-3 sm:mr-0"
            tabs={[
              {
                label: t('channels'),
                href: `/ranking/super-chat/channels/${group}/${channelsPeriod}${genderParam}`
              },
              {
                label: t('live'),
                href: `/ranking/super-chat/live/${group}/${period}${genderParam}`
              }
            ]}
          />
        )}
      </div>
    </RankingTableTitleContainer>
  )
}
