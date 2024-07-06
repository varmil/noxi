import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import StatsCard from 'features/youtube/components/stats/StatsCard'
import StatsProgressCard from 'features/youtube/components/stats/StatsProgressCard'
import { ChannelProfileHeader } from 'features/youtube/components/channel/ChannelProfileHeader'
import { getChannel } from 'features/youtube/api/getChannel'

type Props = {
  id: string
}

export async function ChannelIdDashboard({ id }: PropsWithoutRef<Props>) {
  const { basicInfo, statistics, brandingSettings } = await getChannel(id)
  const t = await getTranslations('YoutubeDashboard')

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8"> */}
      {/* <div className="flex items-center"> */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <ChannelProfileHeader
          src={basicInfo.thumbnails['medium'].url}
          name={basicInfo.title}
          description={basicInfo.description}
          subscriberCount={statistics.subscriberCount}
        />
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsProgressCard />
          <StatsProgressCard />
          <StatsProgressCard />
          <StatsProgressCard />
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

function ListFilterIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  )
}
