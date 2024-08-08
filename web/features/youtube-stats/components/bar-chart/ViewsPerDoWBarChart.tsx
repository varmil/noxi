'use client'

import { PropsWithoutRef } from 'react'
import { useFormatter } from 'next-intl'
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
import { VideosSchema } from 'api-schema/youtube/videoSchema'
import * as dayOfWeek from '../../utils/dayOfWeek'

const chartConfig = {
  desktop: {
    color: 'hsl(var(--chart-4))'
  },
  label: {
    color: 'hsl(var(--background))'
  }
} satisfies ChartConfig

type Props = {
  videos: VideosSchema
}

export default function ViewsPerDoWBarChart({
  videos
}: PropsWithoutRef<Props>) {
  const format = useFormatter()
  const data = dayOfWeek.avarage(videos)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avarage Views by uploaded day</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
            <XAxis dataKey="views" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="views"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="views"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(v: number) =>
                  format.number(v, { notation: 'compact' })
                }
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          Uploaded on{' '}
          <span className="font-medium text-foreground">
            {dayOfWeek.maxViewsDay(videos).dayOfWeek}
          </span>{' '}
          are the most viewed
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
