'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts'
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
import { useSupersTrendsData } from 'features/channel/hooks/useSupersTrendsData'
import { NUMBER_FORMAT } from 'features/channel/utils/SupersChartNumberFormat'

type Props = {
  supersSummaryHistories: SupersSummaryHistoriesSchema
  config: ChartConfig
}

/** @deprecated it's may be delete in the near future */
export default function SupersTrendsChart({
  supersSummaryHistories,
  config
}: Props) {
  const format = useFormatter()
  const feat = useTranslations('Features.channel.superChat.chart')
  const data = useSupersTrendsData(supersSummaryHistories)

  return (
    <ChartCard>
      <ChartCardHeader>
        <ChartCardTitle>{feat('trends.title')}</ChartCardTitle>
        <CardDescription>{feat('trends.description')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={config}>
          <LineChart data={data} margin={{ top: 10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              stroke="hsl(var(--foreground))"
              tickMargin={10}
              minTickGap={20}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--foreground))"
              domain={['dataMin', 'auto']}
              tickCount={4}
              tickMargin={5}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) =>
                `${format.number(value, NUMBER_FORMAT)}`
              }
            />
            {SupersChartTooltip({ config })}
            <Line
              type="monotone"
              dataKey="last90Days"
              strokeWidth={2}
              dot={false}
              stroke="var(--color-last90Days)"
            />
            {/* <Line
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
            /> */}
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </ChartCardContent>
    </ChartCard>
  )
}
