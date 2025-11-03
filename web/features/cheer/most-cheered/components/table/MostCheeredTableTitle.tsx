import { PropsWithChildren } from 'react'
import { getTranslations } from 'next-intl/server'
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
  group: GroupString
  gender?: Gender
  date?: Date
  className?: string
}>

export default async function MostCheeredTableTitle({
  period,
  group,
  gender,
  date,
  className
}: Props) {
  const global = await getTranslations('Global')
  const page = await getTranslations('Page.ranking.most-cheered')
  const title = (await getTranslations('Features.mostCheered.dimension'))(
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
            group: global(`group.${group}`),
            gender: gender ? global(`gender.${gender}`) : ''
          })}
        </RankingTableTitleDescription>
      </section>
      <PeriodHoverCardFactory type="mostCheered" period={period} date={date} />
    </RankingTableTitleContainer>
  )
}
