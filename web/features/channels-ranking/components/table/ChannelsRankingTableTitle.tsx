import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'components/styles/Image'
import {
  ChannelsRankingPeriod,
  ChannelsRankingDimension
} from 'features/channels-ranking/types/channels-ranking.type'

type Props = PropsWithChildren<{
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  className?: string
}>

export default function ChannelsRankingTableTitle({
  period,
  dimension,
  className
}: Props) {
  const tg = useTranslations('Global.ranking')
  const t = useTranslations('Features.channelsRanking')
  return (
    <section className={`${className || ''}`}>
      <div className={`flex flex-row gap-x-1 items-center`}>
        <div className="flex gap-x-2 items-center text-balance">
          <Image
            src={'/youtube/yt_icon_rgb.png'}
            alt="YouTube"
            width={32}
            height={22.5}
            className="relative w-8 h-[22.5px] top-[0.5px]"
          />
          {t(`ranking.dimension.${dimension}`, {
            period: tg(`period.${period}`)
          })}
        </div>
      </div>
    </section>
  )
}
