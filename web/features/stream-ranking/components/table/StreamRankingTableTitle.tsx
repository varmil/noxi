import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import PeriodHoverCardFactory from 'components/ranking/hover-card/RankingPeriodHoverCardFactory'
import {
  RankingTableTitleContainer,
  RankingTableTitleDescription,
  RankingTableTitleH1
} from 'components/ranking/table/title/RankingTableTitle'
import { StreamRankingDimension } from 'features/stream-ranking/types/stream-ranking.type'
import { Gender } from 'types/gender'
import { StreamRankingPeriod } from 'types/period'

type Props = PropsWithChildren<{
  dimension: StreamRankingDimension
  period: StreamRankingPeriod
  groupName: string
  gender?: Gender
  /** ISO 8601 文字列 */
  date: string
  className?: string
}>

export default function StreamRankingTableTitle({
  dimension,
  period,
  groupName,
  gender,
  date,
  className
}: Props) {
  const global = useTranslations('Global')
  const feat = useTranslations('Features.streamRanking')
  const page = useTranslations('Page.ranking.live')
  const periodName = global(`period.${period}`)
  const periodKeyword = global(`periodKeyword.${period}`)
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

  // concurrent-viewer は期間別ディスクリプション、それ以外は従来通り
  const description =
    dimension === 'concurrent-viewer'
      ? page(
          `metadata.description.dimension.concurrent-viewer.${period}` as Parameters<
            typeof page
          >[0],
          {
            group: groupName,
            gender: gender ? global(`gender.${gender}`) : ''
          }
        )
      : page(`metadata.description.dimension.${dimension}` as 'metadata.description.dimension.super-chat', {
          period: periodName,
          group: groupName,
          gender: gender ? global(`gender.${gender}`) : ''
        })

  return (
    <RankingTableTitleContainer className={className}>
      <section className="space-y-2">
        <RankingTableTitleH1 title={title} />
        <RankingTableTitleDescription>{description}</RankingTableTitleDescription>
      </section>
      <PeriodHoverCardFactory type="live" period={period} date={date} />
    </RankingTableTitleContainer>
  )
}
