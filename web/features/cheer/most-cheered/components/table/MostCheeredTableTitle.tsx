import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import PeriodHoverCardFactory from 'components/ranking/hover-card/RankingPeriodHoverCardFactory'
import {
  RankingTableTitleContainer,
  RankingTableTitleDescription,
  RankingTableTitleH1
} from 'components/ranking/table/title/RankingTableTitle'
import { GroupString } from 'config/constants/Group'
import { Gender } from 'types/gender'
import { MostCheeredPeriod } from 'types/period'

type Props = PropsWithChildren<{
  period: MostCheeredPeriod
  group?: GroupString
  gender?: Gender
  date?: Date
  className?: string
}>

export default function MostCheeredTableTitle({
  period,
  group,
  gender,
  date,
  className
}: Props) {
  const global = useTranslations('Global')
  const page = useTranslations('Page.ranking.most-cheered')
  const title = useTranslations('Features.mostCheered.dimension')(
    `most-cheered`,
    {
      period: global(`period.${period}`),
      group: '',
      gender: ''
    }
  )
    .replace(/\s+/g, ' ')
    .trim()
  return (
    <RankingTableTitleContainer className={className}>
      <section className="space-y-2">
        <RankingTableTitleH1 title={title} />
        <RankingTableTitleDescription>
          {page('metadata.description.dimension.most-cheered', {
            period: global(`period.${period}`),
            group: group ? global(`group.${group}`) : 'VTuber',
            gender: gender ? global(`gender.${gender}`) : ''
          })}
        </RankingTableTitleDescription>
      </section>
      <PeriodHoverCardFactory period={period} date={date} />
    </RankingTableTitleContainer>
  )
}
