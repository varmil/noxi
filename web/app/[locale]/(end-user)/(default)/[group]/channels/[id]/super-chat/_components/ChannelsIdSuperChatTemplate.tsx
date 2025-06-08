import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getSupersMonthlySummaries } from 'apis/supers/getSupersMonthlySummaries'
import { getSupersSummaryHistories } from 'apis/supers/getSupersSummaryHistories'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import ChannelSupersCards from 'features/channel/components/super-chat/ChannelSupersCards'
import SupersCumulativeChart from 'features/channel/components/super-chat/chart/SupersCumulativeChart'
import SupersMonthlyChart from 'features/channel/components/super-chat/chart/SupersMonthlyChart'
import SupersRanking from 'features/supers-ranking/components/SupersRanking'
import dayjs from 'lib/dayjs'
import { Period } from 'types/period'
import type { ChartConfig } from '@/components/ui/chart'

type Props = { id: string; period: Period }

export async function ChannelsIdSuperChatTemplate({
  id,
  period
}: PropsWithoutRef<Props>) {
  const [page, feat, historiesThisMonth, monthlySummaries] = await Promise.all([
    getTranslations('Page.group.channelsId.superChat'),
    getTranslations('Features.channel.superChat'),
    // For Cumulative chart this month
    getSupersSummaryHistories({
      channelId: id,
      createdAfter: dayjs().startOf('month').toDate(),
      createdBefore: new Date()
    }),
    // For Monthly chart last 12 months
    getSupersMonthlySummaries({
      channelId: id,
      limit: 12
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
    <Sections className={`lg:grid-cols-10`}>
      <Section
        className="lg:col-span-3"
        gridClassName={'grid-cols-1 md:grid-cols-3 lg:grid-cols-1'}
        title={page('section.card.title')}
      >
        <ChannelSupersCards channelId={id} />
      </Section>

      <Section className="lg:col-span-7" title={page('section.ranking.title')}>
        <SupersRanking channelId={id} period={period} />
      </Section>

      <Section className="lg:col-span-full">
        <SupersCumulativeChart
          supersSummaryHistories={historiesThisMonth}
          config={cumulativeChartConfig}
        />
      </Section>

      <Section className="lg:col-span-full">
        <SupersMonthlyChart supersMonthlySummaries={monthlySummaries} />
      </Section>
    </Sections>
  )
}
