import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import {
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
  className?: string
}>

export default function StreamRankingTableTitle({
  dimension,
  period,
  groupName,
  gender,
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
  return (
    <section className={`space-y-2 ${className || ''}`}>
      <RankingTableTitleH1 title={title} />
      <RankingTableTitleDescription>
        {page(`metadata.description.dimension.${dimension}`, {
          period: periodName,
          group: groupName,
          gender: gender ? global(`gender.${gender}`) : ''
        })}
      </RankingTableTitleDescription>
    </section>
  )
}
