'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { Area, AreaChart, CartesianGrid } from 'recharts'
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
import { ChatCountsSchema } from 'apis/youtube/schema/chatCountSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import {
  StreamStatsXAxis,
  StreamStatsYAxis
} from 'features/stream-stats/chart/StreamStatsAreaChart'
import { useDateRange } from 'features/stream-stats/hooks/useDateRange'
import { FormatForTick } from 'features/stream-stats/hooks/useFormattedDatetime'

const chartConfig = {
  notMember: {
    label: 'Not Member',
    color: 'hsl(var(--chart-1))'
  },
  member: {
    label: 'Member',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

export default function ChatCounts({
  chatCounts,
  stream
}: {
  chatCounts: ChatCountsSchema
  stream: StreamSchema
}) {
  const t = useTranslations('Features.streamStats')
  const data = useGroupByMinute(chatCounts)
  const dateRange = useDateRange(
    chatCounts[0]?.createdAt,
    chatCounts[chatCounts.length - 1]?.createdAt
  )

  if (chatCounts.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat messages</CardTitle>
        <CardDescription>{dateRange.join(' ')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 10, left: 0, right: 0 }}
          >
            {StreamStatsXAxis({ dataKey: 'time' })}
            {StreamStatsYAxis()}
            <CartesianGrid vertical={false} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[180px]"
                  formatter={(value, name, item, index) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                        style={
                          {
                            '--color-bg': `var(--color-${name})`
                          } as React.CSSProperties
                        }
                      />
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                      </div>
                      {/* Add this after the last item */}
                      {index === 1 && (
                        <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                          Total
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {item.payload.member + item.payload.notMember}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                />
              }
            />
            <Area
              dataKey="member"
              type="natural"
              fill="var(--color-member)"
              fillOpacity={0.7}
              stroke="var(--color-member)"
              stackId="a"
            />
            <Area
              dataKey="notMember"
              type="natural"
              fill="var(--color-notMember)"
              fillOpacity={0.2}
              stroke="var(--color-notMember)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <div className="sr-only">
        {t('srChatCountsChart', {
          dateRange: dateRange.join(''),
          total: stream.metrics.chatMessages
        })}
      </div>
    </Card>
  )
}

/* 5分単位でレコードをグループ化 */
const useGroupByMinute = (
  data: ChatCountsSchema
): {
  member: number
  notMember: number
  time: string
}[] => {
  const format = useFormatter()
  const interval = useXAxisInterval(data.length)
  const reduced = data.reduce((acc, chat) => {
    const date = new Date(chat.createdAt)
    const minutes = date.getMinutes()
    const roundedMinutes = Math.floor(minutes / interval) * interval // {interval}分単位に丸める

    // 分を5分単位にセットし、秒とミリ秒を0にリセット
    date.setMinutes(roundedMinutes)
    date.setSeconds(0)
    date.setMilliseconds(0)

    // グループ化キーを 'HH:mm' 形式に変換
    const dateKey = format.dateTime(date, FormatForTick)

    if (!acc[dateKey]) {
      acc[dateKey] = {
        notMember: 0,
        member: 0,
        time: dateKey
      }
    }

    // チャットデータを集計
    acc[dateKey].member += chat.member
    acc[dateKey].notMember += chat.all - chat.member

    return acc
  }, {} as Record<string, any>)

  // reduced の結果を配列として返す
  return Object.values(reduced)
}

/**
 *
 * @param length the length of ChatCountsSchema
 * @returns the minute(s) interval
 */
const useXAxisInterval = (length: number) => {
  switch (true) {
    case length < 120:
      return 1
    case length < 180:
      return 2
    case length < 240:
      return 3
    case length < 300:
      return 4
    default:
      return 5
  }
}
