'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { Bar, XAxis, YAxis, CartesianGrid, BarChart } from 'recharts'
import { CardDescription } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart'
import { SupersMonthlySummariesSchema } from 'apis/youtube/schema/supersMonthlySummarySchema'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader,
  ChartCardTitle
} from 'components/styles/card/ChartCard'
import SupersChartTooltip from 'features/channel/components/super-chat/chart/SupersChartTooltip'
import { useSupersMonthlyData } from 'features/channel/hooks/useSupersMonthlyData'
import { NUMBER_FORMAT } from 'features/channel/utils/SupersChartNumberFormat'

type Props = {
  supersMonthlySummaries: SupersMonthlySummariesSchema
}

export default function SupersMonthlyChart({ supersMonthlySummaries }: Props) {
  const feat = useTranslations('Features.channel.superChat.chart')
  const format = useFormatter()
  const data = useSupersMonthlyData(supersMonthlySummaries)

  const chartConfig = {
    thisMonth: {
      label: feat('monthly.label'),
      color: 'var(--chart-3)'
    }
  } satisfies ChartConfig

  return (
    <ChartCard>
      <ChartCardHeader className="px-0">
        <ChartCardTitle>{feat('monthly.title')}</ChartCardTitle>
        <CardDescription>{feat('monthly.description')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data} margin={{ top: 10, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickMargin={10}
              tickFormatter={value => value.replace('-', '/')}
              minTickGap={10}
            />
            <YAxis
              orientation="left"
              tickFormatter={(value: number) =>
                `${format.number(value, NUMBER_FORMAT)}`
              }
            />
            {SupersChartTooltip({ config: chartConfig })}
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="thisMonth"
              fill="var(--color-thisMonth)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </ChartCardContent>
    </ChartCard>
  )
}
