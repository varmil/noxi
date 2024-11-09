'use client'

import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import StatsJoinedCard from 'features/youtube-stats/components/simple-card/StatsJoinedCard'
import StatsSubscribersCard from 'features/youtube-stats/components/simple-card/StatsSubscribersCard'
import StatsVideosCard from 'features/youtube-stats/components/simple-card/StatsVideosCard'
import StatsViewsCard from 'features/youtube-stats/components/simple-card/StatsViewsCard'

export default function ChannelData({ channel }: { channel: ChannelSchema }) {
  const { basicInfo, statistics } = channel
  return (
    <>
      <StatsSubscribersCard count={statistics?.subscriberCount ?? 0} />
      <StatsViewsCard count={statistics?.viewCount ?? 0} />
      <StatsVideosCard count={statistics?.videoCount ?? 0} />
      <StatsJoinedCard
        date={new Date(basicInfo?.publishedAt).toDateString() ?? 'N/A'}
      />
    </>
  )
}
