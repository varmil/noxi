import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import {
  ChartGrid,
  Section,
  Sections
} from 'features/channel/components/container/ChannelContainer'
import UploadsPerDayOfWeekBarChart from 'features/channel/components/stream-times/chart/UploadsPerDoWBarChart'
import ViewsPerDoWBarChart from 'features/channel/components/stream-times/chart/ViewsPerDoWBarChart'
import StreamTimesHistogram from 'features/channel/components/stream-times/histogram/StreamTimesHistogram'
import { getRecentEndedStreams } from 'utils/stream/getRecentEndedStreams'

type Props = { id: string }

export async function ChannelsIdStreamTimesTemplate({
  id
}: PropsWithoutRef<Props>) {
  const [t, streams] = await Promise.all([
    getTranslations('Page.group.channelsId.template'),
    getRecentEndedStreams({ channelId: id })
  ])

  return (
    <Sections>
      <Section className="" title={t('timeSlotAnalysis')}>
        <ChartGrid>
          <StreamTimesHistogram channelId={id} />
        </ChartGrid>
      </Section>

      <Section className="" title={t('doWAnalysis')}>
        <ChartGrid>
          <UploadsPerDayOfWeekBarChart streams={streams} />
          <ViewsPerDoWBarChart streams={streams} />
        </ChartGrid>
      </Section>
    </Sections>
  )
}
