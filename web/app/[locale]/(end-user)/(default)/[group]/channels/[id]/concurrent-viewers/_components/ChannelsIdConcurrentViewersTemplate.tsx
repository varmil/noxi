import { PropsWithoutRef } from 'react'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import ConcurrentViewersBarChart from 'features/youtube-stats/components/bar-chart/concurrent-viewers/ConcurrentViewersBarChart'

type Props = { id: string }

export async function ChannelsIdConcurrentViewersTemplate({
  id
}: PropsWithoutRef<Props>) {
  return (
    <Sections>
      <Section>
        <ConcurrentViewersBarChart channelId={id} className="z-10" />
        {/* <StreamTrendsTable channel={channel} /> */}
      </Section>
    </Sections>
  )
}
