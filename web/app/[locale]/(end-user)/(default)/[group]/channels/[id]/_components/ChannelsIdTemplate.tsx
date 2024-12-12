import { PropsWithoutRef, Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { getVideosInChannel } from 'apis/youtube/getVideosInChannel'
import {
  ChartGrid,
  Section,
  Sections
} from 'features/channel/components/container/ChannelContainer'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'
import ConcurrentViewersBarChart from 'features/youtube-stats/components/bar-chart/concurrent-viewers/ConcurrentViewersBarChart'
import ViewsBarChart from 'features/youtube-stats/components/bar-chart/views/ViewsBarChart'
import ChannelData from './ui/channel-data/ChannelData'
import { ChannelCommentTabs } from './ui/latest-user-reactions/ChannelCommentTabs'

type Props = { id: string }

export async function ChannelsIdTemplate({ id }: PropsWithoutRef<Props>) {
  const [t, channel] = await Promise.all([
    getTranslations('Page.group.channelsId.template'),
    getChannel(id)
  ])

  return (
    <Sections className={`lg:grid-cols-3`}>
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

      <Section className="lg:col-span-full lg:order-3" title={t('liveTrends')}>
        <ChartGrid>
          <ConcurrentViewersBarChart channelId={id} />
          <ViewsBarChart channelId={id} />
        </ChartGrid>
      </Section>

      <Section className="lg:col-span-full lg:order-6" title={t('liveStreams')}>
        <Suspense fallback={<p>Loading Live Streams...</p>}>
          <EndedStreamGallery where={{ channelId: id }} />
        </Suspense>
      </Section>
    </Sections>
  )
}
