'use client'

import { useEffect, useState } from 'react'
import { Train } from 'lucide-react'
import { HyperTrainSchema } from 'apis/hyper-trains/hyperTrainSchema'
import { ChannelsSchema } from 'apis/youtube/schema/channelSchema'
import { HyperTrainLevelBadge } from 'components/hyper-train/HyperTrainLevelBadge'
import { getLevelBgColor } from 'components/hyper-train/train-styles'
import { Link } from 'lib/navigation'

type Props = {
  trains: HyperTrainSchema[]
  channels: ChannelsSchema
}

export function HyperTrainTickerClient({ trains, channels }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (trains.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % trains.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [trains.length])

  const train = trains[currentIndex]
  if (!train) return null

  return (
    <Link
      href={`/${train.group}/channels/${train.channelId}/hyper-chat`}
      className={`flex items-center justify-center h-8 px-4 text-white text-sm ${getLevelBgColor(train.level)} transition-all`}
    >
      <Train className="size-4" />
      <HyperTrainLevelBadge level={train.level} size="sm" />
      <span className="text-xs font-medium line-clamp-1 break-all">
        {
          channels.find(c => c.basicInfo.id === train.channelId)?.basicInfo
            .title
        }
      </span>
      {trains.length > 1 && (
        <span className="text-xs opacity-75 ml-2">
          {currentIndex + 1}/{trains.length}
        </span>
      )}
    </Link>
  )
}
