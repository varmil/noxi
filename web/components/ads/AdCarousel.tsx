'use client'

import { ReactNode, useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Props {
  /** ランダム順で表示するカード（募集カードなど） */
  randomCards: ReactNode[]
  /** 常に最後に表示するカード（実際の広告など） */
  lastCard: ReactNode
  className?: string
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function AdCarouselSkeleton() {
  return (
    <Card className="pt-0 pb-2 gap-0 overflow-hidden">
      {/* サムネイル */}
      <Skeleton className="w-full aspect-video rounded-none" />
      {/* チャンネル情報 */}
      <div className="py-2 px-3 flex items-center gap-3">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-6 flex-1" />
      </div>
      {/* メッセージ */}
      <div className="px-3 pb-2">
        <Skeleton className="h-[81.5px] w-full rounded-xl" />
      </div>
    </Card>
  )
}

export function AdCarousel({ randomCards, lastCard, className }: Props) {
  const [shuffledCards, setShuffledCards] = useState<ReactNode[] | null>(null)

  useEffect(() => {
    setShuffledCards(shuffle(randomCards))
  }, [randomCards])

  // マウント前はスケルトンを表示
  if (shuffledCards === null) {
    return (
      <div className={cn('w-full', className)}>
        <AdCarouselSkeleton />
      </div>
    )
  }

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
