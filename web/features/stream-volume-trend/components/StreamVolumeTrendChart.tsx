'use client'

import {
  DateTimeFormatOptions,
  NumberFormatOptions,
  useFormatter,
  useTranslations
} from 'next-intl'
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts'
import { CardDescription } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { StreamVolumeTrendsSchema } from 'apis/youtube/schema/streamVolumeTrendSchema'
import ChartTooltipFormatter from 'components/chart/ChartTooltipFormatter'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader,
  ChartCardTitle
} from 'components/styles/card/ChartCard'
import type { NameType } from 'recharts/types/component/DefaultTooltipContent'

const DateFormat: DateTimeFormatOptions = {
  month: 'numeric',
  day: 'numeric'
}

const NumberFormat: NumberFormatOptions = {
  notation: 'compact'
}

interface Props {
  data: StreamVolumeTrendsSchema
}

export function StreamVolumeTrendChart({ data }: Props) {
  const t = useTranslations('Features.streamVolumeTrend')
  const format = useFormatter()

  const chartConfig: ChartConfig = {
    streamCount: {
      label: t('streamCount'),
      color: 'var(--chart-5)'
    },
    totalDurationHours: {
      label: t('totalDurationHours'),
      color: 'var(--chart-2)'
    }
  }

  return (
    <ChartCard>
      <ChartCardHeader>
        <ChartCardTitle>{t('title')}</ChartCardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart data={data} margin={{ left: -20, top: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={8}
              minTickGap={40}
              tickFormatter={date =>
                format.dateTime(new Date(date), DateFormat)
              }
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              tickFormatter={(value: number) =>
                format.number(value, NumberFormat)
              }
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              tickFormatter={(value: number) =>
                `${format.number(value, NumberFormat)}h`
              }
            />
            <ChartTooltip
              allowEscapeViewBox={{ x: false, y: true }}
              content={
                <ChartTooltipContent
                  className="w-[180px] sm:w-[200px]"
                  labelFormatter={(_label, [{ payload }]) =>
                    format.dateTime(new Date(payload.date), {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      weekday: 'short'
                    })
                  }
                  formatter={(value, name) => {
                    const formattedValue =
                      name === 'totalDurationHours'
                        ? `${format.number(value as number, NumberFormat)}h`
                        : format.number(value as number)
                    return (
                      <ChartTooltipFormatter
                        indicatorColor={name}
                        name={(chartConfig[name]?.label as NameType) || name}
                        value={formattedValue}
                      />
                    )
                  }}
                />
              }
            />
            <Bar
              dataKey="streamCount"
              yAxisId="left"
              fill="var(--color-streamCount)"
              // fillOpacity={0.7}
              radius={[2, 2, 0, 0]}
            />
            <Line
              type="linear"
              dataKey="totalDurationHours"
              yAxisId="right"
              stroke="var(--color-totalDurationHours)"
              strokeWidth={1.5}
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </ChartCardContent>
    </ChartCard>
  )
}
