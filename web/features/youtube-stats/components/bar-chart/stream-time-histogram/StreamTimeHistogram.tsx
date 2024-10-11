import { PropsWithoutRef } from 'react'
import { ChartConfig } from '@/components/ui/chart'
import { getStreamsForStatsChart } from 'features/youtube-stats/utils/getStreamsForStatsChart'
import Chart from './Chart'

const chartConfig = {
  main: {
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

type Props = {
  channelId: string
}

export default async function StreamTimeHistogram({
  channelId
}: PropsWithoutRef<Props>) {
  const streams = await getStreamsForStatsChart({ channelId })

  if (streams.length === 0) {
    return null
  }

  return <Chart chartConfig={chartConfig} streams={streams} />
}
