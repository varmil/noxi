'use client'

import { ReactNode, useMemo } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface Props {
  /** ランダム順で表示するカード（募集カードなど） */
  randomCards: ReactNode[]
  /** 常に最後に表示するカード（実際の広告など） */
  lastCard: ReactNode
  className?: string
}

export function AdCarousel({ randomCards, lastCard, className }: Props) {
  // ランダム順にシャッフル（クライアント側で実行）
  const shuffledCards = useMemo(() => {
    const shuffled = [...randomCards]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [randomCards])

  const allCards = [...shuffledCards, lastCard]

  return (
    <Carousel
      opts={{
        loop: true,
        align: 'start'
      }}
      plugins={[
        Autoplay({
          delay: 7000,
          stopOnInteraction: true,
          stopOnMouseEnter: true
        })
      ]}
      className={cn('w-full', className)}
    >
      <CarouselContent className="ml-0">
        {allCards.map((card, index) => (
          <CarouselItem key={index} className="pl-0">
            {card}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
