'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChannelsRanking } from 'features/channels-ranking/types/channels-ranking.type'
import PeriodCard from './PeriodCard'

type PeriodItem = {
  id: string
  title: string
  subtitle?: string
  href: string
  channels: ChannelsRanking[]
}

type Props = {
  title: string
  items: PeriodItem[]
  showMoreLabel: string
  initialCount?: number
  incrementCount?: number
}

export default function ArchiveSection({
  title,
  items,
  showMoreLabel,
  initialCount = 12,
  incrementCount = 12
}: Props) {
  const [visibleCount, setVisibleCount] = useState(initialCount)

  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-foreground mb-4">{title}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleItems.map(item => (
          <PeriodCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            href={item.href}
            channels={item.channels}
          />
        ))}
      </div>
      {hasMore && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setVisibleCount(prev => prev + incrementCount)}
          >
            {showMoreLabel}
          </Button>
        </div>
      )}
    </section>
  )
}
