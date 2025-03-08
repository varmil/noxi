import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getSupersSummaryHistories } from 'apis/youtube/getSupersSummaryHistories'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import ChannelSupersCards from 'features/channel/components/super-chat/ChannelSupersCards'
import SupersCumulativeChart from 'features/channel/components/super-chat/chart/SupersCumulativeChart'
import dayjs from 'lib/dayjs'
import type { ChartConfig } from '@/components/ui/chart'

type Props = { id: string }

export async function ChannelsIdSuperChatTemplate({
  id
}: PropsWithoutRef<Props>) {
  const [page, feat, historiesThisMonth] = await Promise.all([
    getTranslations('Page.group.channelsId.superChat'),
    getTranslations('Features.channel.superChat'),
    // For Cumulative chart
    getSupersSummaryHistories({
      channelId: id,
      createdAfter: dayjs().startOf('month').toDate(),
      createdBefore: new Date()
    })
  ])

  const cumulativeChartConfig = {
    daily: {
      label: feat('chart.cumulative.daily'),
      color: 'var(--muted-foreground)'
    },
    monthly: {
      label: feat('chart.cumulative.monthly'),
      color: 'var(--primary)'
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
    </Sections>
  )
}
