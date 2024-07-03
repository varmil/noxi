import { getChannels } from 'features/youtube/api/getChannels'
import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import StatsCard from 'features/youtube/components/stats/StatsCard'
import StatsProgressCard from 'features/youtube/components/stats/StatsProgressCard'
import { ChannelProfileHeader } from 'features/youtube/components/channel/ChannelProfileHeader'

type Props = {
  channelName: string
}

export async function ChannelIdDashboard({
  channelName
}: PropsWithoutRef<Props>) {
  const t = await getTranslations('YoutubeDashboard')

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8"> */}
      {/* <div className="flex items-center"> */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <ChannelProfileHeader
          src={
            'https://yt3.ggpht.com/ytc/AIdro_mDfvpyERcscb5IkZJQgwbPOTHcgfnwEk9zI7SPDLetuQ=s240-c-k-c0xffffffff-no-rj-mo'
          }
          name={channelName}
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
