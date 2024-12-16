'use client'

import { NumberFormatOptions, useFormatter, useTranslations } from 'next-intl'
import {
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts'
import { CardDescription, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { SupersSummaryHistoriesSchema } from 'apis/youtube/schema/supersSummarySchema'
import ChartTooltipFormatter from 'components/chart/ChartTooltipFormatter'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader
} from 'components/styles/card/ChartCard'
import { useCumulativeData } from 'features/channel/utils/useCumulativeData'

// const data = [
//   { date: '10-09', daily: 500000, monthly: 30000 },
//   { date: '10-11', daily: 1700000, monthly: 45000 },
//   { date: '10-13', daily: 1000000, monthly: 50000 },
//   { date: '10-15', daily: 300000, monthly: 65000 },
//   { date: '10-17', daily: 200000, monthly: 70000 },
//   { date: '10-19', daily: 1600000, monthly: 150000 },
//   { date: '10-21', daily: 2500000, monthly: 200000 },
//   { date: '10-23', daily: 1000000, monthly: 250000 },
//   { date: '10-25', daily: 700000, monthly: 280000 },
//   { date: '10-27', daily: 850000, monthly: 300000 },
//   { date: '10-29', daily: 1200000, monthly: 320000 },
//   { date: '10-31', daily: 600000, monthly: 350000 },
//   { date: '11-02', daily: 1400000, monthly: 370000 },
//   { date: '11-04', daily: 1200000, monthly: 380000 },
//   { date: '11-06', daily: 500000, monthly: 390000 },
//   { date: '11-09', daily: 700000, monthly: 400000 }
// ]

const NUMBER_FORMAT: NumberFormatOptions = {
  style: 'currency',
  notation: 'compact',
  currency: 'JPY'
}

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

export default function ThisMonthsCumulativeSupersChart({
  supersSummaryHistories
}: Props) {
  const t = useTranslations('Features.channel.superChat.chart')
  const format = useFormatter()
  const data = useCumulativeData(supersSummaryHistories)

  return (
    <ChartCard>
      <ChartCardHeader>
        <CardTitle>{t('thisMonth.title')}</CardTitle>
        <CardDescription>{t('thisMonth.description')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart data={data}>
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
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[165px] sm:w-[180px]"
                  formatter={(value, name) => (
                    <ChartTooltipFormatter
                      indicatorColor={name}
                      name={chartConfig[name]?.label || name}
                      value={format.number(value as number, NUMBER_FORMAT)}
                    />
                  )}
                />
              }
            />
            <Legend />
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
