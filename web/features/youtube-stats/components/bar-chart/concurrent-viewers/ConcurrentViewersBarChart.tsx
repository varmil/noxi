import { PropsWithoutRef } from 'react'
import { ChartConfig } from '@/components/ui/chart'
import Chart from 'features/youtube-stats/components/bar-chart/concurrent-viewers/Chart'
import { getStreamsForStatsChart } from 'features/youtube-stats/utils/getStreamsForStatsChart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

type Props = {
  channelId: string
}

export default async function ConcurrentViewersBarChart({
  channelId
}: PropsWithoutRef<Props>) {
  const streams = await getStreamsForStatsChart({ channelId })
  return <Chart chartConfig={chartConfig} streams={streams} />
}
