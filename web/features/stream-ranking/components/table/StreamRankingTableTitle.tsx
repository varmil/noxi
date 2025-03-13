import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'components/styles/Image'
import { GroupString } from 'config/constants/Group'
import { StreamRankingDimension } from 'features/stream-ranking/types/stream-ranking.type'
import { Gender } from 'types/gender'
import { StreamRankingPeriod } from 'types/period'

type Props = PropsWithChildren<{
  dimension: StreamRankingDimension
  period: StreamRankingPeriod
  group?: GroupString
  gender?: Gender
  className?: string
}>

export default function StreamRankingTableTitle({
  dimension,
  period,
  group,
  gender,
  className
}: Props) {
  const global = useTranslations('Global')
  const feat = useTranslations('Features.streamRanking')
  const title = feat(`ranking.dimension.${dimension}`, {
    period: global(`period.${period}`),
    group: group ? global(`group.${group}`) : 'VTuber',
    gender: gender ? global(`gender.${gender}`) : ''
  })
    .replace(/\s+/g, ' ')
    .trim()
  return (
    <section className={`text-sm sm:text-base ${className || ''}`}>
      <h1
        title={title}
        className="flex text-base sm:text-lg font-bold"
        aria-label={title}
      >
        <div className="flex gap-x-1 sm:gap-x-2 items-center">
          <span className="tracking-tighter line-clamp-1 break-all">
            {title}
          </span>
        </div>
      </h1>
    </section>
  )
}
