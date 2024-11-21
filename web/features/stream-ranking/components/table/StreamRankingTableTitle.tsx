import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'components/styles/Image'

type Props = PropsWithChildren<{
  className?: string
}>

export default function StreamRankingTableTitle({ className }: Props) {
  const t = useTranslations('Features.streamRanking')
  return (
    <section className={`${className || ''}`}>
      <div className={`flex flex-row gap-x-1 items-center`}>
        <div className="flex gap-x-2 items-center text-balance text-lg sm:text-xl">
          <Image
            src={'/youtube/yt_icon_rgb.png'}
            alt="YouTube"
            width={32}
            height={22.5}
            className="relative w-8 h-[22.5px] top-[0.5px]"
          />
          {t('ranking')}
        </div>
      </div>
    </section>
  )
}
