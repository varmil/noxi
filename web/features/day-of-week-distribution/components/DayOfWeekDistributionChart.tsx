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
import { DayOfWeekDistributionsSchema } from 'apis/youtube/schema/dayOfWeekDistributionSchema'
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
  data: DayOfWeekDistributionsSchema
}

export function DayOfWeekDistributionChart({ data }: Props) {
  const t = useTranslations('Features.dayOfWeekDistribution')
  const tGlobal = useTranslations('Global')
  const format = useFormatter()

  const chartConfig: ChartConfig = {
    streamCount: {
      label: t('streamCount'),
      color: 'var(--chart-3)'
    },
    medianViewers: {
      label: t('medianViewers'),
      color: 'var(--chart-1)'
    }
  }

  const weekdays = [
    tGlobal('weekday.mon'),
    tGlobal('weekday.tue'),
    tGlobal('weekday.wed'),
    tGlobal('weekday.thu'),
    tGlobal('weekday.fri'),
    tGlobal('weekday.sat'),
    tGlobal('weekday.sun')
  ]

  const formatDayOfWeek = (dayOfWeek: number) => weekdays[dayOfWeek]

  return (
    <ChartCard>
      <ChartCardHeader>
        <ChartCardTitle>{t('title')}</ChartCardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart
            data={data}
            margin={{ left: -20, top: 10, right: -20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="dayOfWeek"
              tickLine={false}
              tickMargin={8}
              tickFormatter={formatDayOfWeek}
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
                format.number(value, NumberFormat)
              }
            />
            <ChartTooltip
              allowEscapeViewBox={{ x: false, y: true }}
              content={
                <ChartTooltipContent
                  className="w-[180px] sm:w-[200px]"
                  labelFormatter={(_label, [{ payload }]) =>
                    `${weekdays[payload.dayOfWeek]}${tGlobal('weekday.suffix')}`
                  }
                  formatter={(value, name) => {
                    const key = name as string
                    const formattedValue = format.number(value as number)
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
              radius={[2, 2, 0, 0]}
              isAnimationActive={false}
            />
            <Line
              type="linear"
              dataKey="medianViewers"
              yAxisId="right"
              stroke="var(--color-medianViewers)"
              strokeWidth={1.5}
              dot={true}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ChartContainer>
        <table className="sr-only">
          <caption>{t('title')}</caption>
          <thead>
            <tr>
              <th scope="col">{t('table.dayOfWeek')}</th>
              <th scope="col">{t('streamCount')}</th>
              <th scope="col">{t('medianViewers')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.dayOfWeek}>
                <td>{weekdays[row.dayOfWeek]}</td>
                <td>{row.streamCount}</td>
                <td>{format.number(row.medianViewers)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartCardContent>
    </ChartCard>
  )
}
