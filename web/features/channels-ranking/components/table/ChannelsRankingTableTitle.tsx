import { PropsWithChildren } from 'react'
import { ChartNoAxesColumnIncreasing } from 'lucide-react'
import { useTranslations } from 'next-intl'
import PeriodHoverCardFactory from 'components/ranking/hover-card/RankingPeriodHoverCardFactory'
import { GroupString } from 'config/constants/Site'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'
import { Gender } from 'types/gender'
import { ChannelsRankingPeriod } from 'types/period'

type Props = PropsWithChildren<{
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  group?: GroupString
  gender?: Gender
  date?: Date
  className?: string
}>

export default function ChannelsRankingTableTitle({
  period,
  dimension,
  group,
  gender,
  date,
  className
}: Props) {
  const global = useTranslations('Global')
  const feat = useTranslations('Features.channelsRanking')
  return (
    <section className={`flex text-sm sm:text-base ${className || ''}`}>
      <ChartNoAxesColumnIncreasing className="w-6 h-6 mr-3" />

      <div className="flex flex-col gap-y-2 sm:w-full sm:flex-row sm:justify-between">
        <h1 className="flex items-center font-bold">
          <div className="flex gap-x-1 sm:gap-x-2 items-center line-clamp-1">
            <span className="line-clamp-1">
              {feat(`ranking.dimension.${dimension}`, {
                period: global(`period.${period}`),
                group: group ? global(`group.${group}`) : 'VTuber',
                gender: gender ? global(`gender.${gender}`) : ''
              })
                .replace(/\s+/g, ' ')
                .trim()}
            </span>
          </div>
        </h1>

        <div>
          <PeriodHoverCardFactory period={period} date={date} />
        </div>
      </div>
    </section>
  )
}
