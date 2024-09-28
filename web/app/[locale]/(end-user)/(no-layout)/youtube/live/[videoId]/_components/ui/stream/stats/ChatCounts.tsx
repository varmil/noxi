'use client'

import { useFormatter } from 'next-intl'
import { XAxis, Area, AreaChart, CartesianGrid } from 'recharts'
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

const chartConfig = {
  member: {
    label: 'Member',
    color: 'hsl(var(--chart-1))'
  },
  all: {
    label: 'All',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

export default function ChatCounts({
  chatCounts
}: {
  chatCounts: ChatCountsSchema
}) {
  const data = useGroupByMinute(chatCounts)
  console.log('reduced data', data)

  const description = (
    <>
      {useFormattedDatetime(
        chatCounts[0] ? new Date(chatCounts[0].createdAt) : undefined
      )}{' '}
      -{' '}
      {useFormattedDatetime(
        chatCounts[chatCounts.length - 1]
          ? new Date(chatCounts[chatCounts.length - 1].createdAt)
          : undefined
      )}
    </>
  )
  if (chatCounts.length === 0) return null

  // 1時間おきのticksを生成
  // const generateTicks = () => {
  //   if (data.length === 0) return []
  //   const allHours = data.map(item => item.time.split(':')[0])
  //   const uniqueHours = [...new Set(allHours)]
  //   return uniqueHours.map(hour => `${hour}:00`)
  // }

  return (
    <section className="">
      <Card>
        <CardHeader>
          <CardTitle>Chat</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={70}
                // ticks={generateTicks()}
                // tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="all"
                type="natural"
                fill="var(--color-all)"
                fillOpacity={0.4}
                stroke="var(--color-all)"
                stackId="a"
              />
              <Area
                dataKey="member"
                type="natural"
                fill="var(--color-member)"
                fillOpacity={0.4}
                stroke="var(--color-member)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  )
}

const useFormattedDatetime = (date?: Date) => {
  const format = useFormatter()
  if (!date) return undefined
  return format.dateTime(date, {
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  })
}

/* 5分単位でレコードをグループ化 */
const useGroupByMinute = (
  data: ChatCountsSchema
): {
  all: number
  member: number
  time: string
}[] => {
  const format = useFormatter()
  const reduced = data.reduce((acc, chat) => {
    const date = new Date(chat.createdAt)
    const minutes = date.getMinutes()
    const roundedMinutes = Math.floor(minutes / 5) * 5 // 5分単位に丸める

    // 分を5分単位にセットし、秒とミリ秒を0にリセット
    date.setMinutes(roundedMinutes)
    date.setSeconds(0)
    date.setMilliseconds(0)

    // グループ化キーを 'HH:mm' 形式に変換
    const dateKey = format.dateTime(date, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    })

    if (!acc[dateKey]) {
      acc[dateKey] = {
        all: 0,
        member: 0,
        time: dateKey
      }
    }

    // チャットデータを集計
    acc[dateKey].all += chat.all
    acc[dateKey].member += chat.member

    return acc
  }, {} as Record<string, any>)

  // reduced の結果を配列として返す
  return Object.values(reduced)
}
