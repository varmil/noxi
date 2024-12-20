import { PropsWithoutRef } from 'react'
import { ChartConfig } from '@/components/ui/chart'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import Chart from './Chart'

const chartConfig = {
  main: {
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

type Props = {
  streams: StreamsSchema
}

export default async function StreamTimesHistogram({
  streams
}: PropsWithoutRef<Props>) {
  if (streams.length === 0) {
    return null
  }

  return <Chart chartConfig={chartConfig} streams={streams} />
}
