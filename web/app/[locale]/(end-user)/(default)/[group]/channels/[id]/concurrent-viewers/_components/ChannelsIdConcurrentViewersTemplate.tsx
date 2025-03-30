import { PropsWithoutRef } from 'react'
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
  const [channel] = await Promise.all([getChannel(id)])

  return (
    <Sections>
      <Section>
        <ConcurrentViewersBarChart channelId={id} className="z-10" />
        <StreamTrendsTable channel={channel} />
      </Section>
    </Sections>
  )
}
