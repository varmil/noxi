import { PropsWithChildren } from 'react'
import { getTranslations } from 'next-intl/server'
import AuthModalWithText from 'components/auth/dialog/AuthModalWithText'
import PeriodHoverCardFactory from 'components/ranking/hover-card/RankingPeriodHoverCardFactory'
import {
  RankingTableTitleContainer,
  RankingTableTitleDescription,
  RankingTableTitleH1
} from 'components/ranking/table/title/RankingTableTitle'
import { GroupString } from 'config/constants/Group'
import { auth } from 'lib/auth'
import { Gender } from 'types/gender'
import { TopFansPeriod } from 'types/period'

type Props = PropsWithChildren<{
  period: TopFansPeriod
  group: GroupString
  gender?: Gender
  date?: Date
  className?: string
}>

export default async function TopFansTableTitle({
  period,
  group,
  gender,
  date,
  className
}: Props) {
  const session = await auth()
  const global = await getTranslations('Global')
  const page = await getTranslations('Page.ranking.top-fans')
  const title = (await getTranslations('Features.topFans.dimension'))(
    `top-fans`,
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
          <div>
            {page('metadata.description.dimension.top-fans', {
              period: global(`period.${period}`),
              group: global(`group.${group}`),
              gender: gender ? global(`gender.${gender}`) : ''
            })}
          </div>
        </RankingTableTitleDescription>
        {session ? null : <AuthModalWithText className="pb-4 sm:pb-0" />}
      </section>
      <PeriodHoverCardFactory type="topFans" period={period} date={date} />
    </RankingTableTitleContainer>
  )
}
