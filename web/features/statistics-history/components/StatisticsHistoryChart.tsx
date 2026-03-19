'use client'

import { useMemo } from 'react'
import { useFormatter } from 'next-intl'
import {
  Bar,
  Line,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  Cell
} from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import ChartTooltipFormatter from 'components/chart/ChartTooltipFormatter'
import type { StatisticsHistoryPoint } from '../types/statistics-history'
import type { NameType } from 'recharts/types/component/DefaultTooltipContent'

interface Props {
  data: StatisticsHistoryPoint[]
  labels: { total: string; diff: string }
}

const POSITIVE_COLOR = 'hsl(142, 71%, 45%)' // green-500
const NEGATIVE_COLOR = 'hsl(0, 84%, 60%)' // red-500
const LINE_COLOR = 'hsl(24, 95%, 53%)' // orange-500

export function StatisticsHistoryChart({ data, labels }: Props) {
  const format = useFormatter()

  const chartConfig: ChartConfig = {
    diff: {
      label: labels.diff,
      color: POSITIVE_COLOR
    },
    total: {
      label: labels.total,
      color: LINE_COLOR
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const hasDiff = useMemo(() => data.some(d => d.diff !== 0), [data])

  return (
    <ChartContainer config={chartConfig} className="w-full">
      <ComposedChart
        data={data}
        margin={{ left: 0, top: 5, right: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          minTickGap={40}
          tickFormatter={formatDate}
          fontSize={12}
        />
        <YAxis
          yAxisId="total"
          orientation="left"
          domain={['dataMin - 0', 'dataMax + 0']}
          tickLine={false}
          minTickGap={20}
          axisLine={false}
          tickFormatter={(v: number) =>
            format.number(v, { notation: 'standard' })
          }
          fontSize={12}
          width={'auto'}
        />
        {hasDiff && (
          <ReferenceLine
            yAxisId="diff"
            y={0}
            stroke="#888"
            strokeDasharray="3 3"
          />
        )}
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[220px]"
              labelFormatter={(_label, payloads) => {
                const payload = payloads[0]?.payload as
                  | StatisticsHistoryPoint
                  | undefined
                if (!payload) return ''
                return format.dateTime(new Date(payload.date), {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                })
              }}
              formatter={(value, name) => {
                const key = name as string
                return (
                  <ChartTooltipFormatter
                    indicatorColor={name}
                    name={(chartConfig[key]?.label as NameType) || name}
                    value={format.number(value as number)}
                  />
                )
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          yAxisId="diff"
          dataKey="diff"
          fill={POSITIVE_COLOR}
          isAnimationActive={false}
          radius={[2, 2, 0, 0]}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.diff >= 0 ? POSITIVE_COLOR : NEGATIVE_COLOR}
            />
          ))}
        </Bar>
        <Line
          yAxisId="total"
          type="monotone"
          dataKey="total"
          stroke={LINE_COLOR}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ChartContainer>
  )
}
