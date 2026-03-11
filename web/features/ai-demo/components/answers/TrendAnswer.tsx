'use client'

import { useTranslations } from 'next-intl'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart'
import { TREND_CHART_DATA, TREND_KEYWORDS } from '../../constants/demoData'

export default function TrendAnswer() {
  const t = useTranslations('Features.aiDemo')

  const chartConfig = Object.fromEntries(
    TREND_KEYWORDS.map(kw => [
      kw.key,
      { label: t(`charts.trendKeywords.${kw.key}`), color: kw.color }
    ])
  ) satisfies ChartConfig

  return (
    <div className="mt-4 space-y-2">
      <p className="text-sm font-medium">{t('charts.trendTitle')}</p>
      <ChartContainer config={chartConfig}>
        <LineChart data={TREND_CHART_DATA}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={11} />
          <YAxis
            fontSize={12}
            tickFormatter={v => `${v as number}`}
            label={{
              value: t('charts.trendYAxis'),
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 11 }
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {TREND_KEYWORDS.map(kw => (
            <Line
              key={kw.key}
              type="monotone"
              dataKey={kw.key}
              stroke={kw.color}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </div>
  )
}
