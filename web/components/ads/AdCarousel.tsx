'use client'

import { ReactNode } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface Props {
  /** 表示するカード（順序はサーバー側で決定済み） */
  cards: ReactNode[]
  className?: string
}

export function AdCarousel({ cards, className }: Props) {
  return (
    <Carousel
      opts={{
        loop: true,
        align: 'start'
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
          stopOnMouseEnter: true
        })
      ]}
      className={cn('w-full', className)}
    >
      <CarouselContent className="ml-0">
        {cards.map((card, index) => (
          <CarouselItem key={index} className="pl-0">
            {card}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
