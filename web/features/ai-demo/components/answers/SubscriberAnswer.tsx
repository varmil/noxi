'use client'

import { useTranslations } from 'next-intl'
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart'
import { SUBSCRIBER_CHART_DATA } from '../../constants/demoData'

export default function SubscriberAnswer() {
  const t = useTranslations('Features.aiDemo')

  const chartConfig = {
    total: {
      label: t('charts.subscriberTotal'),
      color: 'var(--chart-1)'
    },
    increase: {
      label: t('charts.subscriberIncrease'),
      color: 'var(--chart-3)'
    }
  } satisfies ChartConfig

  return (
    <div className="mt-4 space-y-2">
      <p className="text-sm font-medium">{t('charts.subscriberTitle')}</p>
      <ChartContainer config={chartConfig}>
        <ComposedChart data={SUBSCRIBER_CHART_DATA}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            fontSize={11}
            tickFormatter={v => {
              const [, m] = (v as string).split('-')
              return `${Number(m)}月`
            }}
          />
          <YAxis
            yAxisId="left"
            fontSize={11}
            tickFormatter={v => `${((v as number) / 10000).toFixed(0)}万`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            fontSize={11}
            tickFormatter={v => `${((v as number) / 1000).toFixed(1)}K`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            yAxisId="left"
            dataKey="total"
            fill="var(--chart-1)"
            radius={[4, 4, 0, 0]}
            opacity={0.7}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="increase"
            stroke="var(--chart-3)"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  )
}
