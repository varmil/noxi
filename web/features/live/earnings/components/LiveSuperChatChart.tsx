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
import ChartTooltipFormatter from 'components/chart/ChartTooltipFormatter'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader,
  ChartCardTitle
} from 'components/styles/card/ChartCard'
import { LiveSuperChatChartData } from '../utils/super-chat-chart'
import type { NameType } from 'recharts/types/component/DefaultTooltipContent'

const CurrencyFormat: NumberFormatOptions = {
  style: 'currency',
  notation: 'compact',
  currency: 'JPY'
}

const TimeFormat: DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hourCycle: 'h23'
}

interface Props {
  data: LiveSuperChatChartData[]
  config: ChartConfig
}

export function LiveSuperChatChart({ data, config }: Props) {
  const feat = useTranslations('Features.live.earnings.chart.superChat')
  const format = useFormatter()

  return (
    <ChartCard>
      <ChartCardHeader>
        <ChartCardTitle>{feat('title')}</ChartCardTitle>
        <CardDescription>{feat('description')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={config}>
          <ComposedChart data={data} margin={{ top: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={8}
              minTickGap={40}
              tickFormatter={time =>
                format.dateTime(new Date(time), TimeFormat)
              }
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              tickFormatter={(value: number) =>
                `${format.number(value, CurrencyFormat)}`
              }
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              tickFormatter={(value: number) =>
                `${format.number(value, CurrencyFormat)}`
              }
            />
            <ChartTooltip
              allowEscapeViewBox={{ x: false, y: true }}
              content={
                <ChartTooltipContent
                  className="w-[165px] sm:w-[180px]"
                  labelFormatter={(_label, [{ payload }]) =>
                    format.dateTime(new Date(payload.time), TimeFormat)
                  }
                  formatter={(value, name) => {
                    const key = name as string
                    return (
                      <ChartTooltipFormatter
                        indicatorColor={name}
                        name={(config[key]?.label as NameType) || name}
                        value={format.number(value as number, CurrencyFormat)}
                      />
                    )
                  }}
                />
              }
            />
            <Bar
              dataKey="amount"
              yAxisId="left"
              fill="var(--color-amount)"
              fillOpacity={0.3}
              radius={[2, 2, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="cumulativeAmount"
              yAxisId="right"
              stroke="var(--color-cumulativeAmount)"
              strokeWidth={3.5}
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </ChartCardContent>
    </ChartCard>
  )
}
