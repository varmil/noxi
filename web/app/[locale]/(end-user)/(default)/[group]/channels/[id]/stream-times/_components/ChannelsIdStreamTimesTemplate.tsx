import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import {
  ChartGrid,
  Section,
  Sections
} from 'features/channel/components/container/ChannelContainer'
import ChannelStreamTimesCards from 'features/channel/components/stream-times/card/ChannelStreamTimesCards'
import StreamTimesDoWChart from 'features/channel/components/stream-times/chart/StreamTimesDoWChart'
import StreamTimesHistogram from 'features/channel/components/stream-times/histogram/StreamTimesHistogram'
import { getRecentEndedStreams } from 'utils/stream/getRecentEndedStreams'

type Props = { id: string }

export async function ChannelsIdStreamTimesTemplate({
  id
}: PropsWithoutRef<Props>) {
  const [page, streams] = await Promise.all([
    getTranslations('Page.group.channelsId.streamTimes'),
    getRecentEndedStreams({ channelId: id })
  ])

  return (
    <Sections>
      <Section title={page('section.card.title')}>
        <ChannelStreamTimesCards streams={streams} />
      </Section>

      <Section>
        <ChartGrid>
          <StreamTimesHistogram streams={streams} />
          <StreamTimesDoWChart streams={streams} />
        </ChartGrid>
      </Section>
    </Sections>
  )
}
