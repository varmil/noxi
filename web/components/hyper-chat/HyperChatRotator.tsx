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
import { HyperChatBubble } from 'components/hyper-chat/HyperChatBubble'
import { getRotationList } from 'utils/hyper-chat/rotation'

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

  // 複数件の場合のみ Fade 効果を有効化
  const plugins = useMemo(() => {
    const autoplay = Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true
    })
    return rotationList.length > 1 ? [Fade(), autoplay] : [autoplay]
  }, [rotationList.length])

  if (rotationList.length === 0) {
    return null
  }

  return (
    <Carousel
      opts={{
        loop: true,
        align: 'start'
      }}
      plugins={plugins}
      className={cn('w-full max-w-full overflow-hidden', className)}
    >
      <CarouselContent className="ml-0">
        {rotationList.map((hyperChat, index) => (
          <CarouselItem
            key={`${hyperChat.id}-${index}`}
            className={cn(
              'pl-0 min-w-0',
              hyperChats.length > 1 &&
                'transition-opacity duration-1500 ease-in-out'
            )}
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
