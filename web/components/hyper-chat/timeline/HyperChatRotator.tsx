'use client'

import { useMemo } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { getRotationList } from 'utils/hyper-chat/rotation'
import { HyperChatBubble } from './HyperChatBubble'

interface Props {
  hyperChats: HyperChatSchema[]
  className?: string
  onBubbleClick?: () => void
}

export function HyperChatRotator({
  hyperChats,
  className,
  onBubbleClick
}: Props) {
  // ローテーション用リスト（スロット重み付け適用）
  const rotationList = useMemo(() => getRotationList(hyperChats), [hyperChats])

  if (rotationList.length === 0) {
    return null
  }

  // 1件のみの場合はカルーセルを使わずシンプルに描画
  if (hyperChats.length === 1) {
    return (
      <div className={cn('w-full max-w-full', className)}>
        <button
          type="button"
          onClick={onBubbleClick}
          className="block w-full text-left"
        >
          <HyperChatBubble hyperChat={rotationList[0]} />
        </button>
      </div>
    )
  }

  return (
    <Carousel
      opts={{ loop: true, align: 'start' }}
      plugins={[
        Fade(),
        Autoplay({
          delay: 3900,
          stopOnInteraction: false,
          stopOnMouseEnter: true
        })
      ]}
      className={cn('w-full max-w-full overflow-hidden', className)}
    >
      <CarouselContent className="ml-0">
        {rotationList.map((hyperChat, index) => (
          <CarouselItem
            key={`${hyperChat.id}-${index}`}
            className="pl-0 min-w-0 transition-opacity duration-1000 ease-in-out"
          >
            <button
              type="button"
              onClick={onBubbleClick}
              className="block w-full text-left"
            >
              <HyperChatBubble hyperChat={hyperChat} />
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
