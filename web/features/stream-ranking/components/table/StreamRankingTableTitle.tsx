import { PropsWithChildren } from 'react'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'components/styles/Image'
import {
  StreamRankingPeriod,
  StreamRankingDimension
} from 'features/stream-ranking/types/stream-ranking.type'

type Props = PropsWithChildren<{
  period: StreamRankingPeriod
  dimension: StreamRankingDimension
  className?: string
}>

export default function StreamRankingTableTitle({
  period,
  dimension,
  className
}: Props) {
  const breadcrumb = useTranslations('Breadcrumb')
  const global = useTranslations('Global.ranking')
  const feat = useTranslations('Features.streamRanking')
  return (
    <section className={`${className || ''}`}>
      <h1 className="flex text-sm sm:text-base">
        <Image
          src={'/youtube/yt_icon_rgb.png'}
          alt="YouTube"
          width={32}
          height={22.5}
          className="relative w-8 h-[22.5px] top-[0.5px] mr-3"
        />
        <div className="flex gap-x-1 sm:gap-x-2 items-center line-clamp-1">
          <span className="flex-1 min-w-20 break-anywhere line-clamp-1">
            {breadcrumb('streamsRanking')}
          </span>
          <ChevronRight className="relative w-3 h-3 top-[1px]" />
          <span className="line-clamp-1">
            {feat(`ranking.dimension.${dimension}`, {
              period: global(`period.${period}`)
            })}
          </span>
        </div>
      </h1>
    </section>
  )
}
