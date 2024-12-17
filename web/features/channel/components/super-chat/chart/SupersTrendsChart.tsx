'use client'

import { useFormatter } from 'next-intl'
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts'
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
import { useSupersTrendsData } from 'features/channel/hooks/useSupersTrendsData'
import { NUMBER_FORMAT } from 'features/channel/utils/SupersChartNumberFormat'

const chartConfig = {
  last90Days: {
    label: '過去90日間',
    color: 'hsl(var(--chart-1))'
  },
  last30Days: {
    label: '過去30日間',
    color: 'hsl(var(--chart-2))'
  },
  last7Days: {
    label: '過去7日間',
    color: 'hsl(var(--chart-3))'
  }
} satisfies ChartConfig

type Props = {
  supersSummaryHistories: SupersSummaryHistoriesSchema
}

export default function SupersTrendsChart({ supersSummaryHistories }: Props) {
  const format = useFormatter()
  const data = useSupersTrendsData(supersSummaryHistories)

  return (
    <ChartCard>
      <ChartCardHeader>
        <CardTitle>スパチャトレンド</CardTitle>
        <CardDescription>
          90日、30日、7日のスパチャ推移を確認できます
        </CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data} margin={{ top: 10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickMargin={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickMargin={5}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) =>
                `${format.number(value, NUMBER_FORMAT)}`
              }
            />
            {SupersChartTooltip({ config: chartConfig })}
            <Line
              type="monotone"
              dataKey="last90Days"
              strokeWidth={2}
              dot={false}
              stroke="var(--color-last90Days)"
            />
            <Line
              type="monotone"
              dataKey="last30Days"
              strokeWidth={2}
              dot={false}
              stroke="var(--color-last30Days)"
            />
            <Line
              type="monotone"
              dataKey="last7Days"
              strokeWidth={2}
              dot={false}
              stroke="var(--color-last7Days)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </ChartCardContent>
    </ChartCard>
  )
}
