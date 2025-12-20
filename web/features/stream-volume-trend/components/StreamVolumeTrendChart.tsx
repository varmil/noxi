'use client'

import { NumberFormatOptions, useFormatter, useTranslations } from 'next-intl'
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
      color: 'var(--chart-3)'
    },
    totalDurationHours: {
      label: t('totalDurationHours'),
      color: 'var(--chart-1)'
    }
  }

  const formatDateWithWeekday = (dateStr: string) => {
    const date = new Date(dateStr)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekdays = ['日', '月', '火', '水', '木', '金', '土']
    const weekday = weekdays[date.getDay()]
    return `${month}/${day} (${weekday})`
  }

  return (
    <ChartCard>
      <ChartCardHeader>
        <ChartCardTitle>{t('title')}</ChartCardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart data={data} margin={{ left: -20, top: 10, right: -5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={8}
              minTickGap={40}
              tickFormatter={formatDateWithWeekday}
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
                    const key = name as string
                    const formattedValue =
                      key === 'totalDurationHours'
                        ? `${format.number(value as number, NumberFormat)}h`
                        : format.number(value as number)
                    return (
                      <ChartTooltipFormatter
                        indicatorColor={name}
                        name={(chartConfig[key]?.label as NameType) || name}
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
              isAnimationActive={false}
            />
            <Line
              type="linear"
              dataKey="totalDurationHours"
              yAxisId="right"
              stroke="var(--color-totalDurationHours)"
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ChartContainer>
        {/* SEO・アクセシビリティ用: スクリーンリーダーとGooglebot向けのデータテーブル */}
        <table className="sr-only">
          <caption>{t('title')}</caption>
          <thead>
            <tr>
              <th scope="col">{t('table.date')}</th>
              <th scope="col">{t('streamCount')}</th>
              <th scope="col">{t('totalDurationHours')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.date}>
                <td>{row.date}</td>
                <td>{row.streamCount}</td>
                <td>{row.totalDurationHours}h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartCardContent>
    </ChartCard>
  )
}
