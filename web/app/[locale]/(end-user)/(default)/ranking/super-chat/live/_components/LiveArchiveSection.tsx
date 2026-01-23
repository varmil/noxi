'use client'

import { useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  LiveArchiveItem,
  fetchLiveArchiveItems
} from '../_actions/fetchLiveArchiveItems'
import LivePeriodCard from './LivePeriodCard'

type Props = {
  title: string
  type: 'weekly' | 'monthly'
  group: string
  locale: 'ja' | 'en'
  initialItems: LiveArchiveItem[]
  initialHasMore: boolean
  totalCount: number
  showMoreLabel: string
  incrementCount?: number
}

export default function LiveArchiveSection({
  title,
  type,
  group,
  locale,
  initialItems,
  initialHasMore,
  totalCount,
  showMoreLabel,
  incrementCount = 12
}: Props) {
  const [items, setItems] = useState<LiveArchiveItem[]>(initialItems)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isPending, startTransition] = useTransition()

  const handleLoadMore = () => {
    startTransition(async () => {
      const result = await fetchLiveArchiveItems(
        type,
        group,
        locale,
        items.length,
        incrementCount
      )
      setItems(prev => [...prev, ...result.items])
      setHasMore(result.hasMore)
    })
  }

  return (
    <section className="@container mb-12">
      <h2 className="text-xl font-bold text-foreground mb-4">
        {title}
        <span className="text-sm font-normal text-muted-foreground ml-2">
          ({items.length} / {totalCount})
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-3 @xl:grid-cols-2 @4xl:grid-cols-3 @7xl:grid-cols-4">
        {items.map(item => (
          <LivePeriodCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            href={item.href}
            streams={item.streams}
          />
        ))}
      </div>
      {hasMore && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              showMoreLabel
            )}
          </Button>
        </div>
      )}
    </section>
  )
}
