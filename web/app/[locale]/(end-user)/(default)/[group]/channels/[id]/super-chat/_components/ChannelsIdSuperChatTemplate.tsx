import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getSupersSummaryHistories } from 'apis/youtube/getSupersSummaryHistories'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import ChannelSupersCards from 'features/channel/components/super-chat/ChannelSupersCards'
import SupersCumulativeChart from 'features/channel/components/super-chat/chart/SupersCumulativeChart'
import SupersTrendsChart from 'features/channel/components/super-chat/chart/SupersTrendsChart'
import dayjs from 'lib/dayjs'
import type { ChartConfig } from '@/components/ui/chart'

type Props = { id: string }

export async function ChannelsIdSuperChatTemplate({
  id
}: PropsWithoutRef<Props>) {
  const [global, page, feat, historiesThisMonth, historiesLast90Days] =
    await Promise.all([
      getTranslations('Global'),
      getTranslations('Page.group.channelsId.superChat'),
      getTranslations('Features.channel.superChat'),
      // For Cumulative chart
      getSupersSummaryHistories({
        channelId: id,
        createdAfter: dayjs().startOf('month').toDate(),
        createdBefore: new Date()
      }),
      // For Trends chart
      getSupersSummaryHistories({
        channelId: id,
        createdAfter: dayjs().subtract(90, 'days').toDate(),
        createdBefore: new Date()
      })
    ])

  const cumulativeChartConfig = {
    daily: {
      label: feat('chart.cumulative.daily'),
      color: 'hsl(var(--muted-foreground))'
    },
    monthly: {
      label: feat('chart.cumulative.monthly'),
      color: 'hsl(var(--primary))'
    }
  } satisfies ChartConfig

  const trendsChartConfig = {
    last90Days: {
      label: global('period.last90Days'),
      color: 'hsl(var(--chart-1))'
    },
    last30Days: {
      label: global('period.last30Days'),
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig

  return (
    <Sections>
      <Section title={page('section.card.title')}>
        <ChannelSupersCards channelId={id} />
      </Section>

      <Section>
        <SupersCumulativeChart
          supersSummaryHistories={historiesThisMonth}
          config={cumulativeChartConfig}
        />
      </Section>

      <Section>
        <SupersTrendsChart
          supersSummaryHistories={historiesLast90Days}
          config={trendsChartConfig}
        />
      </Section>
    </Sections>
  )
}
