import { PropsWithoutRef } from 'react'
import { ChartConfig } from '@/components/ui/chart'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import Chart from './Chart'

const chartConfig = {
  main: {
    color: 'var(--chart-5)'
  }
} satisfies ChartConfig

type Props = {
  streams: StreamsSchema
}

export default async function StreamTimesHistogram({
  streams
}: PropsWithoutRef<Props>) {
  return <Chart chartConfig={chartConfig} streams={streams} />
}
