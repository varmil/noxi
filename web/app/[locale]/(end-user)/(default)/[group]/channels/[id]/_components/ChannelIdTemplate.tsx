import { PropsWithChildren, PropsWithoutRef, Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { getVideosInChannel } from 'apis/youtube/getVideosInChannel'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'
import PeriodTabs from 'features/period-tab/components/PeriodTabs'
import UploadsPerDayOfWeekBarChart from 'features/youtube-stats/components/bar-chart/UploadsPerDoWBarChart'
import ViewsPerDoWBarChart from 'features/youtube-stats/components/bar-chart/ViewsPerDoWBarChart'
import ConcurrentViewersBarChart from 'features/youtube-stats/components/bar-chart/concurrent-viewers/ConcurrentViewersBarChart'
import StreamTimeHistogram from 'features/youtube-stats/components/bar-chart/stream-time-histogram/StreamTimeHistogram'
import ViewsBarChart from 'features/youtube-stats/components/bar-chart/views/ViewsBarChart'
import ChannelData from './ui/channel-data/ChannelData'
import { ChannelCommentTabs } from './ui/latest-user-reactions/ChannelCommentTabs'
import { ChannelProfile } from './ui/profile/ChannelProfile'

type Props = { id: string }

export async function ChannelIdTemplate({ id }: PropsWithoutRef<Props>) {
  const [t, channel, videos] = await Promise.all([
    getTranslations('Page.group.channelsId.template'),
    getChannel(id),
    getVideosInChannel({ channelId: id, limit: 50 })
  ])

  return (
    <section className="flex flex-1 flex-col gap-4">
      <ChannelProfile basicInfo={channel.basicInfo} />
      <PeriodTabs />
      <div
        className={`grid gap-x-1 gap-y-7 grid-cols-1 \
        lg:grid-cols-3 lg:gap-x-2 lg:gap-y-8`}
      >
        <Section
          gridClassName={'grid-cols-2 lg:grid-cols-1'}
          className="lg:col-span-1 lg:order-2"
          title={t('data')}
        >
          <ChannelData channel={channel} />
        </Section>

        <Section
          className="lg:col-span-2 lg:order-1"
          title={t('latestUserReactions')}
        >
          <ChannelCommentTabs channelId={id} />
        </Section>

        <Section
          className="lg:col-span-full lg:order-3"
          title={t('liveTrends')}
        >
          <ChartGrid>
            <ConcurrentViewersBarChart channelId={id} />
            <ViewsBarChart channelId={id} />
          </ChartGrid>
        </Section>

        <Section
          className="lg:col-span-full lg:order-4"
          title={t('timeSlotAnalysis')}
        >
          <ChartGrid>
            <StreamTimeHistogram channelId={id} />
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
            <EndedStreamGallery where={{ channelId: id }} />
          </Suspense>
        </Section>

        {/* 2024/11/04：要らないかもしれないので一旦コメントアウト */}
        {/* <Section className="lg:col-span-full lg:order-last" title="Videos">
          <Suspense fallback={<p>Loading Videos...</p>}>
            <VideoInChannelGallery channelId={basicInfo.id} />
          </Suspense>
        </Section> */}
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
