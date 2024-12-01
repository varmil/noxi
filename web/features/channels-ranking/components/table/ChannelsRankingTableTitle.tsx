import { PropsWithChildren } from 'react'
import { ChevronRight, TvMinimalPlayIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import DailyHoverCard from 'features/channels-ranking/components/styles/DailyHoverCard'
import {
  ChannelsRankingPeriod,
  ChannelsRankingDimension
} from 'features/channels-ranking/types/channels-ranking.type'

type Props = PropsWithChildren<{
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  date?: Date
  className?: string
}>

export default function ChannelsRankingTableTitle({
  period,
  dimension,
  date,
  className
}: Props) {
  const breadcrumb = useTranslations('Breadcrumb')
  const global = useTranslations('Global.ranking')
  const feat = useTranslations('Features.channelsRanking')
  return (
    <section className={`${className || ''}`}>
      <h1 className="flex text-sm sm:text-base items-center">
        <TvMinimalPlayIcon className="w-6 h-6 mr-3" />
        <div className="flex gap-x-1 sm:gap-x-2 items-center line-clamp-1">
          <span className="flex-1 break-anywhere line-clamp-1">
            {breadcrumb('channelsRanking')}
          </span>
          <ChevronRight className="relative w-3 h-3 top-[1px]" />
          <span className="line-clamp-1">
            {feat(`ranking.dimension.${dimension}`, {
              period: global(`period.${period}`)
            })}
          </span>
        </div>
      </h1>
      {date && (
        <div className="relative">
          <DailyHoverCard date={date} />
        </div>
      )}
    </section>
  )
}
