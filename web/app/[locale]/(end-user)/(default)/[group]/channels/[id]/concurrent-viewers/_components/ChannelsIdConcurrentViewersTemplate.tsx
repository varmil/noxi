import { PropsWithoutRef } from 'react'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import ConcurrentViewersBarChart from 'features/youtube-stats/components/bar-chart/concurrent-viewers/ConcurrentViewersBarChart'

type Props = { id: string; page?: number }

export async function ChannelsIdConcurrentViewersTemplate({
  id,
  page
}: PropsWithoutRef<Props>) {
  return (
    <Sections>
      <Section>
        <ConcurrentViewersBarChart
          channelId={id}
          page={page}
          className="z-10"
        />
        {/* <StreamTrendsTable channel={channel} /> */}
      </Section>
    </Sections>
  )
}
