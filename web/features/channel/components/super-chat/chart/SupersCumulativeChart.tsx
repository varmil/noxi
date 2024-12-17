'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { Bar, Line, ComposedChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import { CardDescription, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart'
import { SupersSummaryHistoriesSchema } from 'apis/youtube/schema/supersSummarySchema'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader
} from 'components/styles/card/ChartCard'
import SupersChartTooltip from 'features/channel/components/super-chat/chart/SupersChartTooltip'
import { useSupersCumulativeData } from 'features/channel/hooks/useSupersCumulativeData'
import { NUMBER_FORMAT } from 'features/channel/utils/SupersChartNumberFormat'

const chartConfig = {
  daily: {
    label: 'daily',
    color: 'hsl(var(--muted-foreground))'
  },
  monthly: {
    label: 'this month',
    color: 'hsl(var(--primary))'
  }
} satisfies ChartConfig

type Props = {
  supersSummaryHistories: SupersSummaryHistoriesSchema
}

export default function SupersCumulativeChart({
  supersSummaryHistories
}: Props) {
  const t = useTranslations('Features.channel.superChat.chart')
  const format = useFormatter()
  const data = useSupersCumulativeData(supersSummaryHistories)

  return (
    <ChartCard>
      <ChartCardHeader>
        <CardTitle>{t('thisMonth.title')}</CardTitle>
        <CardDescription>{t('thisMonth.description')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart data={data} margin={{ top: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickMargin={10}
              tickFormatter={value => value.replace('-', '/')}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickFormatter={(value: number) =>
                `${format.number(value, NUMBER_FORMAT)}`
              }
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value: number) =>
                `${format.number(value, NUMBER_FORMAT)}`
              }
            />
            {SupersChartTooltip({ config: chartConfig })}
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              yAxisId="right"
              dataKey="daily"
              fill="var(--color-daily)"
              fillOpacity={0.3}
              radius={[2, 2, 0, 0]}
            />
            <Line
              yAxisId="left"
              type="linear"
              dataKey="monthly"
              stroke="var(--color-monthly)"
              strokeWidth={3.5}
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </ChartCardContent>
    </ChartCard>
  )
}
