'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { Area, AreaChart, Bar, BarChart, CartesianGrid } from 'recharts'
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
  // const data = useGroupByMinute(chatCounts)
  const format = useFormatter()
  const data = chatCounts.map(chat => ({
    time: format.dateTime(chat.createdAt, FormatForTick),
    notMember: chat.all - chat.member,
    member: chat.member
  }))
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
          <BarChart
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
            <Bar
              dataKey="member"
              type="natural"
              fill="var(--color-member)"
              fillOpacity={0.9}
              stroke="var(--color-member)"
              stackId="a"
            />
            <Bar
              dataKey="notMember"
              type="natural"
              fill="var(--color-notMember)"
              fillOpacity={0.6}
              stroke="var(--color-notMember)"
              stackId="a"
            />
          </BarChart>
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
