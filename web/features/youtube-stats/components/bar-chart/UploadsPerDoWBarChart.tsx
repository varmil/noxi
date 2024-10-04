'use client'

import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
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
import { VideosSchema } from 'apis/youtube/schema/videoSchema'
import * as dayOfWeek from '../../utils/dayOfWeek'

const chartConfig = {
  desktop: {
    color: 'hsl(var(--chart-2))'
  },
  label: {
    color: 'hsl(var(--background))'
  }
} satisfies ChartConfig

type Props = {
  videos: VideosSchema
}

export default function UploadsPerDayOfWeekBarChart({
  videos
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.chart')
  const data = dayOfWeek.useGroupByDay(videos)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Uploads per day</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="dayOfWeek"
              type="category"
              width={47}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Bar
              dataKey="count"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          The most videos are uploaded on{' '}
          <span className="font-medium text-foreground">
            {dayOfWeek.useMaxVideosDay(videos).dayOfWeek}
          </span>
        </CardDescription>
      </CardFooter>
      <div className="sr-only">
        {t('srUploadsPerDoWChart')}
        {data.map(dayData =>
          t('srUploadsPerDoWChartLoop', {
            count: dayData.count,
            DoW: dayData.dayOfWeek
          })
        )}
      </div>
    </Card>
  )
}
