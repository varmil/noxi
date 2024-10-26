import { PropsWithoutRef } from 'react'
import { ChartConfig } from '@/components/ui/chart'
import { getStatistics } from 'apis/youtube/data-api/getStatistics'
import { getStreamsForStatsChart } from 'features/youtube-stats/utils/getStreamsForStatsChart'
import Chart from './Chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-3))'
  }
} satisfies ChartConfig

type Props = {
  channelId: string
}

export default async function ViewsBarChart({
  channelId
}: PropsWithoutRef<Props>) {
  const streams = await getStreamsForStatsChart({ channelId })
  const videos = await getStatistics({
    videoIds: streams.map(stream => stream.videoId)
  })

  if (streams.length === 0) {
    return null
  }

  return (
    <Chart
      chartConfig={chartConfig}
      streams={streams}
      statisticsList={videos}
    />
  )
}
