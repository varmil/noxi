'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { Bar, BarChart, CartesianGrid } from 'recharts'
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
import ChartTooltipFormatter, {
  ChartTooltipTotal
} from 'components/chart/ChartTooltipFormatter'
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
                      <ChartTooltipFormatter
                        indicatorColor={name}
                        name={chartConfig[name]?.label || name}
                        value={value}
                      />
                      {/* Add this after the last item */}
                      {index === 1 && (
                        <ChartTooltipTotal
                          value={item.payload.member + item.payload.notMember}
                        />
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
              fillOpacity={1}
              stroke="var(--color-member)"
              stackId="a"
            />
            <Bar
              dataKey="notMember"
              type="natural"
              fill="var(--color-notMember)"
              fillOpacity={1}
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
