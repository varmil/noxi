'use client'

import { PropsWithoutRef } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
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
import { ChannelSchema } from 'features/youtube/types/channelSchema'
import { VideosSchema } from 'features/youtube/types/videoSchema'

dayjs.extend(localizedFormat)

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

type Props = {
  videoAggregation: ChannelSchema['latestVideoAggregation']
  videos: VideosSchema
}

export default function ViewsBarChart({
  videoAggregation,
  videos
}: PropsWithoutRef<Props>) {
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
          {dayjs(data[0].date).format('LL')} -{' '}
          {dayjs(data[data.length - 1].date).format('LL')}
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
                format.number(value, { notation: 'compact' })
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
        {/* <div className="flex gap-2 font-medium leading-none">
          {videoAggregation?.live.averageViews ?? 0} avarage views in the past
          30 days
          <TrendingUp className="h-4 w-4" />
        </div> */}

        <div className="flex gap-2 font-medium leading-none">
          {Math.round(
            videos.reduce((acc, cur) => acc + cur.statistics.viewCount, 0) /
              videos.length
          )}{' '}
          avarage views in the past {videos.length} videos
        </div>
        {/* <div className="leading-none text-muted-foreground">
          {Math.round(
            videos.reduce((acc, cur) => acc + cur.statistics.likeCount, 0) /
              videos.length
          )}{' '}
          avarage likes in the past {videos.length} videos
        </div>
        <div className="leading-none text-muted-foreground">
          {Math.round(
            videos.reduce((acc, cur) => acc + cur.statistics.commentCount, 0) /
              videos.length
          )}{' '}
          avarage comments in the past {videos.length} videos
        </div> */}
      </CardFooter>
    </Card>
  )
}
