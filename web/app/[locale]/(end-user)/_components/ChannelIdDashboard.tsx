import { PropsWithChildren, PropsWithoutRef, Suspense } from 'react'
import { getChannel } from 'api/youtube/getChannel'
import { ChannelProfileHeader } from 'components/youtube/channel/ChannelProfileHeader'
import { getVideosInChannel } from 'features/youtube/api/getVideosInChannel'
import { VideoCards } from 'features/youtube/components/video/VideoCards'
import UploadsPerDayOfWeekBarChart from 'features/youtube-stats/components/bar-chart/UploadsPerDoWBarChart'
import ViewsBarChart from 'features/youtube-stats/components/bar-chart/ViewsBarChart'
import ViewsPerDoWBarChart from 'features/youtube-stats/components/bar-chart/ViewsPerDoWBarChart'
import StatsJoinedCard from 'features/youtube-stats/components/simple-card/StatsJoinedCard'
import StatsSubscribersCard from 'features/youtube-stats/components/simple-card/StatsSubscribersCard'
import StatsVideosCard from 'features/youtube-stats/components/simple-card/StatsVideosCard'
import StatsViewsCard from 'features/youtube-stats/components/simple-card/StatsViewsCard'

type Props = {
  id: string
}

export async function ChannelIdDashboard({ id }: PropsWithoutRef<Props>) {
  const { basicInfo, statistics } = await getChannel(id)
  const videos = await getVideosInChannel({ channelId: basicInfo.id })

  return (
    <section className="flex flex-1 flex-col gap-4">
      <ChannelProfileHeader
        thumbnails={basicInfo.thumbnails}
        name={basicInfo.title}
        description={basicInfo.description}
      />
      <div className="grid gap-1 grid-cols-1 lg:gap-2 lg:grid-cols-3">
        <Section
          gridClassName={'grid-cols-2 lg:grid-cols-1'}
          className="pb-6 lg:col-span-1 lg:order-2"
          title="Data"
        >
          <StatsSubscribersCard count={statistics?.subscriberCount ?? 0} />
          <StatsViewsCard count={statistics?.viewCount ?? 0} />
          <StatsVideosCard count={statistics?.videoCount ?? 0} />
          <StatsJoinedCard
            date={new Date(basicInfo?.publishedAt).toDateString() ?? 'N/A'}
          />
        </Section>

        <Section className="pb-6 lg:col-span-2 lg:order-1" title="Trends">
          <ViewsBarChart videos={videos} />
        </Section>

        <Section
          className="pb-6 lg:col-span-3 lg:order-3"
          title="Days of the week analysis"
        >
          <div className="grid gap-1 grid-cols-1 lg:gap-2 lg:grid-cols-2">
            <UploadsPerDayOfWeekBarChart videos={videos} />
            <ViewsPerDoWBarChart videos={videos} />
          </div>
        </Section>

        <Section className="pb-6 lg:col-span-3 lg:order-5" title="Videos">
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
    </section>
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
      <h2 className="text-xl font-bold lg:text-2xl pb-4">{title}</h2>
      <div className={`grid gap-1 ${gridClassName ?? ''} lg:gap-2`}>
        {children}
      </div>
    </section>
  )
}
