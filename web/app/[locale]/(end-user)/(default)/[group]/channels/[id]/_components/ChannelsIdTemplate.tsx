import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import StreamTrendsTable from 'features/channel/components/stream-trends/StreamTrendsTable'
import ConcurrentViewersBarChart from 'features/youtube-stats/components/bar-chart/concurrent-viewers/ConcurrentViewersBarChart'
import ChannelData from './ui/channel-data/ChannelData'

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
        className="@container lg:col-span-full lg:order-3"
        title={t('liveTrends')}
      >
        <ConcurrentViewersBarChart channelId={id} className="z-10" />
        <StreamTrendsTable channel={channel} />
      </Section>
    </Sections>
  )
}
