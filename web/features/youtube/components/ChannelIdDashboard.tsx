import { PropsWithChildren, PropsWithoutRef, Suspense } from 'react'
import { getChannel } from 'features/youtube/api/getChannel'
import { ChannelProfileHeader } from 'features/youtube/components/channel/ChannelProfileHeader'
import StatsLoyaltyProgressCard from 'features/youtube/components/stats/progress-card/StatsLoyaltyProgressCard'
import StatsPopularityProgressCard from 'features/youtube/components/stats/progress-card/StatsPopularityProgressCard'
import StatsJoinedCard from 'features/youtube/components/stats/simple-card/StatsJoinedCard'
import StatsSubscribersCard from 'features/youtube/components/stats/simple-card/StatsSubscribersCard'
import StatsVideosCard from 'features/youtube/components/stats/simple-card/StatsVideosCard'
import StatsViewsCard from 'features/youtube/components/stats/simple-card/StatsViewsCard'
import { VideoCards } from 'features/youtube/components/video/VideoCards'

type Props = {
  id: string
}

export async function ChannelIdDashboard({ id }: PropsWithoutRef<Props>) {
  const { basicInfo, statistics, brandingSettings } = await getChannel(id)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <ChannelProfileHeader
          thumbnails={basicInfo.thumbnails}
          name={basicInfo.title}
          description={basicInfo.description}
          subscriberCount={statistics.subscriberCount}
        />
        <div>
          <Section className="pb-8" title="YouTube Data">
            <StatsSubscribersCard count={statistics?.subscriberCount ?? 0} />
            <StatsViewsCard count={statistics?.viewCount ?? 0} />
            <StatsVideosCard count={statistics?.videoCount ?? 0} />
            <StatsJoinedCard
              date={new Date(basicInfo?.publishedAt).toDateString() ?? 'N/A'}
            />
          </Section>
          {/* TODO: Impl AI Analysis */}
          {/* <Section className="pb-8" title="AI Analysis">
            <StatsPopularityProgressCard {...statistics} />
            <StatsLoyaltyProgressCard {...statistics} />
          </Section> */}
          <Section className="pb-8" title="Videos">
            <Suspense fallback={<p>Loading cards...</p>}>
              <VideoCards channelId={basicInfo.id} />
            </Suspense>
          </Section>
        </div>
      </main>
    </div>
  )
}

function Section({
  className,
  title,
  children
}: PropsWithChildren<{ className: string; title: string }>) {
  return (
    <section className={className}>
      <h2 className="text-2xl font-bold lg:text-3xl pb-4">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {children}
      </div>
    </section>
  )
}
