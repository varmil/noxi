import { PropsWithoutRef } from 'react'
import ConcurrentViewersBarChart from 'features/channel/components/concurrent-viewers/bar-chart/concurrent-viewers/ConcurrentViewersBarChart'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'

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
      </Section>
    </Sections>
  )
}
