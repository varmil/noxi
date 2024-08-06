'use client'

import { PropsWithoutRef } from 'react'
import { format } from 'path'
import dayjs from 'dayjs'
import { TrendingUp } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { VideosSchema } from 'features/youtube/types/videoSchema'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
  // mobile: {
  //   label: 'Mobile',
  //   color: 'hsl(var(--chart-2))'
  // }
} satisfies ChartConfig

type Props = { videos: VideosSchema }

export default function ViewsBarChart({ videos }: PropsWithoutRef<Props>) {
  const format = useFormatter()

  const data = videos
    .map(video => ({
      date: video.snippet.publishedAt,
      views: video.statistics.viewCount
    }))
    .reverse()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Views Chart</CardTitle>
        <CardDescription>
          {dayjs(data[data.length - 1].date).format('MMMM DD')} -{' '}
          {dayjs(data[0].date).format('MMMM DD')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              tickMargin={10}
              tickSize={3}
              minTickGap={32}
              axisLine={false}
              tickFormatter={value => dayjs(value).format('MMM D')}
            />
            <YAxis
              width={37}
              tickMargin={8}
              tickSize={0}
              axisLine={false}
              tickFormatter={value =>
                format.number(value, {
                  notation: 'compact'
                })
              }
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="views" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
