'use client'

import { useFormatter } from 'next-intl'
import {
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { SupersSummaryHistoriesSchema } from 'apis/youtube/schema/supersSummarySchema'
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

const chartConfig = {
  daily: {
    label: '日間',
    color: 'hsl(var(--muted-foreground))'
  },
  monthly: {
    label: '月間',
    color: 'hsl(var(--primary))'
  }
} satisfies ChartConfig

type Props = {
  supersSummaryHistories: SupersSummaryHistoriesSchema
}

export default function ThisMonthsCumulativeSupersChart({
  supersSummaryHistories
}: Props) {
  const format = useFormatter()
  const data = useCumulativeData(supersSummaryHistories)

  return (
    <Card>
      <CardHeader>
        <CardTitle>推移グラフ</CardTitle>
        <CardDescription>日間売上と月間累計の推移</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer className="h-[200px] sm:h-[300px]" config={chartConfig}>
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
              tickFormatter={(value: number) => {
                return `${format.number(value, {
                  style: 'currency',
                  notation: 'compact',
                  currency: 'JPY'
                })}`
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value: number) =>
                `${format.number(value, {
                  style: 'currency',
                  notation: 'compact',
                  currency: 'JPY'
                })}`
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                // formatter={value => {
                //   return `${format.number(value as number, {
                //     style: 'currency',
                //     notation: 'compact',
                //     currency: 'JPY'
                //   })}`
                // }}
                />
              }
            />
            <Legend />
            <Bar
              yAxisId="right"
              dataKey="daily"
              fill="var(--color-daily)"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="monthly"
              stroke="var(--color-monthly)"
              strokeWidth={4}
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
