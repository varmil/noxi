import { PropsWithChildren, PropsWithoutRef, Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { getVideosInChannel } from 'apis/youtube/getVideosInChannel'
import { ChannelProfile } from 'app/[locale]/(end-user)/(default)/_components/ui/profile/ChannelProfile'
import { ChannelCommentTabs } from 'app/[locale]/(end-user)/(default)/_components/ui/tabs/ChannelCommentTabs'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'
import { VideoInChannelGallery } from 'features/youtube/video/components/VideoInChannelGallery'
import UploadsPerDayOfWeekBarChart from 'features/youtube-stats/components/bar-chart/UploadsPerDoWBarChart'
import ViewsPerDoWBarChart from 'features/youtube-stats/components/bar-chart/ViewsPerDoWBarChart'
import ConcurrentViewersBarChart from 'features/youtube-stats/components/bar-chart/concurrent-viewers/ConcurrentViewersBarChart'
import StreamTimeHistogram from 'features/youtube-stats/components/bar-chart/stream-time-histogram/StreamTimeHistogram'
import ViewsBarChart from 'features/youtube-stats/components/bar-chart/views/ViewsBarChart'
import StatsJoinedCard from 'features/youtube-stats/components/simple-card/StatsJoinedCard'
import StatsSubscribersCard from 'features/youtube-stats/components/simple-card/StatsSubscribersCard'
import StatsVideosCard from 'features/youtube-stats/components/simple-card/StatsVideosCard'
import StatsViewsCard from 'features/youtube-stats/components/simple-card/StatsViewsCard'

type Props = { id: string }

/** TODO:　Live Stream Trendsのheightを調整して空きスペースに配信時間帯のヒストグラムを表示できるようにする */
export async function ChannelIdTemplate({ id }: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.group.channelsId.template')
  const { basicInfo, statistics } = await getChannel(id)
  const videos = await getVideosInChannel({
    channelId: basicInfo.id,
    limit: 50
  })

  return (
    <section className="flex flex-1 flex-col gap-4">
      <ChannelProfile basicInfo={basicInfo} />
      <div
        className={`grid gap-x-1 gap-y-7 grid-cols-1 \
        lg:grid-cols-3 lg:gap-x-2 lg:gap-y-8`}
      >
        <Section
          gridClassName={'grid-cols-2 lg:grid-cols-1'}
          className="lg:col-span-1 lg:order-2"
          title={t('data')}
        >
          <StatsSubscribersCard count={statistics?.subscriberCount ?? 0} />
          <StatsViewsCard count={statistics?.viewCount ?? 0} />
          <StatsVideosCard count={statistics?.videoCount ?? 0} />
          <StatsJoinedCard
            date={new Date(basicInfo?.publishedAt).toDateString() ?? 'N/A'}
          />
        </Section>

        <Section
          className="lg:col-span-2 lg:order-1"
          title={'Latest Super Chat & Comments'}
        >
          <ChannelCommentTabs channelId={basicInfo.id} />
        </Section>

        <Section
          className="lg:col-span-full lg:order-3"
          title={t('liveTrends')}
        >
          <ChartGrid>
            <ConcurrentViewersBarChart channelId={basicInfo.id} />
            <ViewsBarChart channelId={basicInfo.id} />
          </ChartGrid>
        </Section>

        <Section
          className="lg:col-span-full lg:order-4"
          title={t('timeSlotAnalysis')}
        >
          <ChartGrid>
            <StreamTimeHistogram channelId={basicInfo.id} />
          </ChartGrid>
        </Section>

        <Section
          className="lg:col-span-full lg:order-5"
          title={t('doWAnalysis')}
        >
          <ChartGrid>
            <UploadsPerDayOfWeekBarChart videos={videos} />
            <ViewsPerDoWBarChart videos={videos} />
          </ChartGrid>
        </Section>

        <Section
          className="lg:col-span-full lg:order-6"
          title={t('liveStreams')}
        >
          <Suspense fallback={<p>Loading Live Streams...</p>}>
            <EndedStreamGallery where={{ channelId: basicInfo.id }} />
          </Suspense>
        </Section>

        <Section className="lg:col-span-full lg:order-last" title="Videos">
          <Suspense fallback={<p>Loading Videos...</p>}>
            <VideoInChannelGallery channelId={basicInfo.id} />
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
    <section className={`${className}`}>
      <h2 className="text-xl font-bold lg:text-2xl pb-4">{title}</h2>
      <div className={`grid gap-1 ${gridClassName ?? ''} lg:gap-2`}>
        {children}
      </div>
    </section>
  )
}

function ChartGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid gap-1 grid-cols-1 lg:gap-2 lg:grid-cols-2">
      {children}
    </div>
  )
}
