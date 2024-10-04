import { PropsWithoutRef } from 'react'
import { ChartConfig } from '@/components/ui/chart'
import { getStatistics } from 'apis/youtube/getStatistics'
import { getStreams } from 'apis/youtube/getStreams'
import Chart from 'features/youtube-stats/components/bar-chart/views/Chart'
import { getStreamsForStatsChart } from 'features/youtube-stats/utils/getStreamsForStatsChart'

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

  return (
    <Chart
      chartConfig={chartConfig}
      streams={streams}
      statisticsList={videos}
    />
  )
}
