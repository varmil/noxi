'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import StatsJoinedCard from 'features/youtube-stats/components/simple-card/StatsJoinedCard'
import StatsSubscribersCard from 'features/youtube-stats/components/simple-card/StatsSubscribersCard'
import StatsVideosCard from 'features/youtube-stats/components/simple-card/StatsVideosCard'
import StatsViewsCard from 'features/youtube-stats/components/simple-card/StatsViewsCard'

export default function ChannelData({ channel }: { channel: ChannelSchema }) {
  const { basicInfo, statistics } = channel
  const [isOpen, setIsOpen] = React.useState(false)
  const xsClasses = isOpen ? 'block' : 'hidden'

  return (
    <>
      <StatsSubscribersCard count={statistics?.subscriberCount ?? 0} />
      <StatsViewsCard count={statistics?.viewCount ?? 0} />
      <StatsVideosCard
        className={`${xsClasses} lg:block`}
        count={statistics?.videoCount ?? 0}
      />
      <StatsJoinedCard
        className={`${xsClasses} lg:block`}
        date={new Date(basicInfo?.publishedAt).toISOString() ?? 'N/A'}
      />

      <div className="lg:hidden">
        {isOpen ? null : (
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            <ChevronDown className="h-4 w-4" />
          </Button>
        )}
      </div>
    </>
  )
}
