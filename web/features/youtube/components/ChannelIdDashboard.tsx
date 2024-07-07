import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { ChannelProfileHeader } from 'features/youtube/components/channel/ChannelProfileHeader'
import { getChannel } from 'features/youtube/api/getChannel'
import StatsBirthdayCard from 'features/youtube/components/stats/simple-card/StatsBirthdayCard'
import StatsCumulativeVideoCard from 'features/youtube/components/stats/simple-card/StatsCumulativeUploadCard'
import StatsCumulativeViewCard from 'features/youtube/components/stats/simple-card/StatsCumulativeViewCard'
import StatsSubscriberCard from 'features/youtube/components/stats/simple-card/StatsSubscriberCard'
import StatsPopularityProgressCard from 'features/youtube/components/stats/progress-card/StatsPopularityProgressCard'
import StatsLoyaltyProgressCard from 'features/youtube/components/stats/progress-card/StatsLoyaltyProgressCard'

type Props = {
  id: string
}

export async function ChannelIdDashboard({ id }: PropsWithoutRef<Props>) {
  const { basicInfo, statistics, brandingSettings } = await getChannel(id)
  const t = await getTranslations('YoutubeDashboard')

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <ChannelProfileHeader
          src={basicInfo.thumbnails['medium'].url}
          name={basicInfo.title}
          description={basicInfo.description}
          subscriberCount={statistics.subscriberCount}
        />
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <StatsSubscriberCard count={statistics?.subscriberCount ?? 0} />
          <StatsCumulativeViewCard count={statistics?.viewCount ?? 0} />
          <StatsCumulativeVideoCard count={statistics?.videoCount ?? 0} />
          <StatsBirthdayCard
            date={new Date(basicInfo?.publishedAt).toDateString() ?? 'N/A'}
          />
          <StatsPopularityProgressCard {...statistics} />
          <StatsLoyaltyProgressCard {...statistics} />
        </div>
      </main>
    </div>
  )
}

function CirclePlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  )
}
