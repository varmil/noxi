import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import StreamTrendsTable from 'features/channel/components/stream-trends/StreamTrendsTable'
import ConcurrentViewersBarChart from 'features/youtube-stats/components/bar-chart/concurrent-viewers/ConcurrentViewersBarChart'

type Props = { id: string }

export async function ChannelsIdConcurrentViewersTemplate({
  id
}: PropsWithoutRef<Props>) {
  const [page, channel] = await Promise.all([
    getTranslations('Page.group.channelsId.concurrentViewers'),
    getChannel(id)
  ])

  return (
    <Sections>
      <Section className="@container" title={page('section.title')}>
        <ConcurrentViewersBarChart channelId={id} className="z-10" />
        <StreamTrendsTable channel={channel} />
      </Section>
    </Sections>
  )
}
