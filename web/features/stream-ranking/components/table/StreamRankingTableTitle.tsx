import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'components/styles/Image'
import { GroupString } from 'config/constants/Site'
import { StreamRankingDimension } from 'features/stream-ranking/types/stream-ranking.type'
import { Gender } from 'types/gender'
import { StreamRankingPeriod } from 'types/period'

type Props = PropsWithChildren<{
  period: StreamRankingPeriod
  dimension: StreamRankingDimension
  group?: GroupString
  gender?: Gender
  className?: string
}>

export default function StreamRankingTableTitle({
  period,
  dimension,
  group,
  gender,
  className
}: Props) {
  const breadcrumb = useTranslations('Breadcrumb')
  const global = useTranslations('Global')
  const feat = useTranslations('Features.streamRanking')
  return (
    <section className={`text-sm sm:text-base ${className || ''}`}>
      <h1 className="flex font-bold">
        <Image
          src={'/youtube/yt_icon_rgb.png'}
          alt="YouTube"
          width={32}
          height={22.5}
          className="relative w-8 h-[22.5px] top-[0.5px] mr-3"
        />
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
    </section>
  )
}
