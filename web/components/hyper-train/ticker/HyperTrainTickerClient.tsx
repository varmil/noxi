'use client'

import { useEffect, useRef, useState } from 'react'
import { Train } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { HyperTrainSchema } from 'apis/hyper-trains/hyperTrainSchema'
import { ChannelsSchema } from 'apis/youtube/schema/channelSchema'
import { HyperTrainLevelBadge } from 'components/hyper-train/HyperTrainLevelBadge'
import { HyperTrainConfetti } from 'components/hyper-train/ticker/HyperTrainConfetti'
import {
  getLevelBgColor,
  getLevelBorderColor
} from 'components/hyper-train/train-styles'
import Image from 'components/styles/Image'
import { Link } from 'lib/navigation'

type Props = {
  trains: HyperTrainSchema[]
  channels: ChannelsSchema
}

export function HyperTrainTickerClient({ trains, channels }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const tickerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('Features.hyperTrain.ticker')

  useEffect(() => {
    if (trains.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % trains.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [trains.length])

  const train = trains[currentIndex]
  if (!train) return null

  const channel = channels.find(c => c.basicInfo.id === train.channelId)
  const bgColor = getLevelBgColor(train.level)

  return (
    <>
      {/* 画面4方向の縁取りボーダー */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none border-2 ${getLevelBorderColor(train.level)}`}
      />

      <HyperTrainConfetti level={train.level} anchorRef={tickerRef} />

      <div ref={tickerRef}>
        <Link
          href={`/${train.group}/channels/${train.channelId}/hyper-chat`}
          className={`flex flex-col items-center justify-center py-1.5 px-4 text-white text-sm ${bgColor} transition-all`}
        >
          {/* 1行目: アイコン + ハイパートレイン発生中 !! */}
          <div className="flex items-center gap-0.5">
            <Train className="size-4" />
            <HyperTrainLevelBadge level={train.level} size="sm" />
            <span className="text-xs font-bold tracking-wide">
              {t('active')}
            </span>
            {trains.length > 1 && (
              <span className="text-xs opacity-75">
                {currentIndex + 1}/{trains.length}
              </span>
            )}
          </div>

          {/* 2行目: チャンネルアバター + 名前 */}
          <div className="flex items-center gap-1.5 mt-0.5">
            {channel?.basicInfo.thumbnails.default && (
              <Image
                src={channel.basicInfo.thumbnails.default.url}
                alt={channel.basicInfo.title}
                width={18}
                height={18}
                className="rounded-full"
              />
            )}
            <span className="text-xs font-medium line-clamp-1 break-all">
              {channel?.basicInfo.title}
            </span>
          </div>
        </Link>
      </div>
    </>
  )
}
