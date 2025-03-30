'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { Bar, Line, ComposedChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import { CardDescription } from '@/components/ui/card'
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
  ChartCardHeader,
  ChartCardTitle
} from 'components/styles/card/ChartCard'
import SupersChartTooltip from 'features/channel/components/super-chat/chart/SupersChartTooltip'
import { useSupersCumulativeData } from 'features/channel/hooks/useSupersCumulativeData'
import { NUMBER_FORMAT } from 'features/channel/utils/SupersChartNumberFormat'

type Props = {
  supersSummaryHistories: SupersSummaryHistoriesSchema
  config: ChartConfig
}

export default function SupersCumulativeChart({
  supersSummaryHistories,
  config
}: Props) {
  const feat = useTranslations('Features.channel.superChat.chart')
  const format = useFormatter()
  const data = useSupersCumulativeData(supersSummaryHistories)

  return (
    <ChartCard>
      <ChartCardHeader className="px-0">
        <ChartCardTitle>{feat('cumulative.title')}</ChartCardTitle>
        <CardDescription>{feat('cumulative.description')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={config}>
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
            {SupersChartTooltip({ config })}
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
