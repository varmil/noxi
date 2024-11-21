import { PropsWithChildren } from 'react'
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

export default function StreamRankingTableTitle({ period, className }: Props) {
  const tg = useTranslations('Global.ranking')
  const t = useTranslations('Features.streamRanking')
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
          {t('ranking', {
            period: tg(`period.${period}`)
          })}
        </div>
      </div>
    </section>
  )
}
