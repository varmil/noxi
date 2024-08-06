import { PropsWithChildren, PropsWithoutRef, Suspense } from 'react'
import { getChannel } from 'features/youtube/api/getChannel'
import { getVideosInChannel } from 'features/youtube/api/getVideosInChannel'
import { ChannelProfileHeader } from 'features/youtube/components/channel/ChannelProfileHeader'
import ViewsBarChart from 'features/youtube/components/stats/bar-chart/ViewsBarChart'
import StatsJoinedCard from 'features/youtube/components/stats/simple-card/StatsJoinedCard'
import StatsSubscribersCard from 'features/youtube/components/stats/simple-card/StatsSubscribersCard'
import StatsVideosCard from 'features/youtube/components/stats/simple-card/StatsVideosCard'
import StatsViewsCard from 'features/youtube/components/stats/simple-card/StatsViewsCard'
import { VideoCards } from 'features/youtube/components/video/VideoCards'

type Props = {
  id: string
}

export async function ChannelIdDashboard({ id }: PropsWithoutRef<Props>) {
  const { basicInfo, statistics, latestVideoAggregation } = await getChannel(id)
  const videos = await getVideosInChannel({ channelId: basicInfo.id })

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <ChannelProfileHeader
          thumbnails={basicInfo.thumbnails}
          name={basicInfo.title}
          description={basicInfo.description}
        />
        <div className="grid gap-1 grid-cols-1 lg:gap-2 lg:grid-cols-3">
          <Section
            gridClassName={'grid-cols-2 lg:grid-cols-1'}
            className="pb-6 lg:col-span-1 lg:order-2"
            title="YouTube Data"
          >
            <StatsSubscribersCard count={statistics?.subscriberCount ?? 0} />
            <StatsViewsCard count={statistics?.viewCount ?? 0} />
            <StatsVideosCard count={statistics?.videoCount ?? 0} />
            <StatsJoinedCard
              date={new Date(basicInfo?.publishedAt).toDateString() ?? 'N/A'}
            />
          </Section>

          <Section className="pb-6 lg:col-span-2 lg:order-1" title="Charts">
            <ViewsBarChart
              videoAggregation={latestVideoAggregation}
              videos={videos}
            />
          </Section>

          <Section className="pb-6 lg:col-span-3 lg:order-3" title="Videos">
            <Suspense fallback={<p>Loading cards...</p>}>
              <VideoCards
                gridClassName={
                  'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                }
                channelId={basicInfo.id}
              />
            </Suspense>
          </Section>
        </div>
      </main>
    </div>
  )
}

function Section({
  gridClassName,
  className,
  title,
  children
}: PropsWithChildren<{
  gridClassName?: string
  className: string
  title: string
}>) {
  return (
    <section className={className}>
      <h2 className="text-2xl font-bold lg:text-3xl pb-4">{title}</h2>
      <div className={`grid gap-1 ${gridClassName ?? ''} lg:gap-2`}>
        {children}
      </div>
    </section>
  )
}
