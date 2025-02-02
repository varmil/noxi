'use client'

import {
  DateTimeFormatOptions,
  NumberFormatOptions,
  useFormatter
} from 'next-intl'
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts'
import { CardDescription } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader,
  ChartCardTitle
} from 'components/styles/card/ChartCard'
import { LiveSuperChatChartData } from '../utils/super-chat-chart'

const CurrencyFormat: NumberFormatOptions = {
  style: 'currency',
  notation: 'compact',
  currency: 'JPY'
}

const TickFormat: DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hourCycle: 'h23'
}

interface Props {
  data: LiveSuperChatChartData[]
  config: ChartConfig
}

export function LiveSuperChatChart({ data, config }: Props) {
  const format = useFormatter()

  return (
    <ChartCard>
      <ChartCardHeader>
        <ChartCardTitle>スパチャ金額の累積グラフ</ChartCardTitle>
        <CardDescription>
          ライブ配信のスパチャイベントと累積金額
        </CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={config}>
          <ComposedChart data={data} margin={{ top: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickMargin={8}
              minTickGap={40}
              tickFormatter={time =>
                format.dateTime(new Date(time), TickFormat)
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
              allowEscapeViewBox={{ x: true, y: true }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <ChartTooltipContent className="w-[165px] sm:w-[180px]">
                      <div className="text-sm font-bold">
                        {new Date(data.time).toLocaleString()}
                      </div>
                      <div>
                        スーパーチャット: {data.amount.toFixed(2)}{' '}
                        {data.currency}
                      </div>
                      <div>
                        累積金額: {data.cumulativeAmount.toFixed(2)}{' '}
                        {data.currency}
                      </div>
                      <div>ユーザー: {data.displayName}</div>
                      <div>コメント: {data.comment}</div>
                    </ChartTooltipContent>
                  )
                }
                return null
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
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
