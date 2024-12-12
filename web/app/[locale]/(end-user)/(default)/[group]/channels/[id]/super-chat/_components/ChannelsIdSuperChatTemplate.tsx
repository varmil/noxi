import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { getVideosInChannel } from 'apis/youtube/getVideosInChannel'
import {
  ChartGrid,
  Section,
  Sections
} from 'features/channel/components/container/ChannelContainer'
import PeriodTabs from 'features/period-tab/components/PeriodTabs'
import UploadsPerDayOfWeekBarChart from 'features/youtube-stats/components/bar-chart/UploadsPerDoWBarChart'
import ViewsPerDoWBarChart from 'features/youtube-stats/components/bar-chart/ViewsPerDoWBarChart'
import StreamTimeHistogram from 'features/youtube-stats/components/bar-chart/stream-time-histogram/StreamTimeHistogram'

type Props = { id: string }

export async function ChannelsIdSuperChatTemplate({
  id
}: PropsWithoutRef<Props>) {
  const [t, channel, videos] = await Promise.all([
    getTranslations('Page.group.channelsId.template'),
    getChannel(id),
    getVideosInChannel({ channelId: id, limit: 50 })
  ])

  return (
    <section className="flex flex-1 flex-col gap-4">
      <PeriodTabs />

      <Sections>
        <Section className="" title={t('timeSlotAnalysis')}>
          <ChartGrid>
            <StreamTimeHistogram channelId={id} />
          </ChartGrid>
        </Section>

        <Section className="" title={t('doWAnalysis')}>
          <ChartGrid>
            <UploadsPerDayOfWeekBarChart videos={videos} />
            <ViewsPerDoWBarChart videos={videos} />
          </ChartGrid>
        </Section>
      </Sections>
    </section>
  )
}
