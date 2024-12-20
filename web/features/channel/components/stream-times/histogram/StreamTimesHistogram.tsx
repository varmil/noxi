import { PropsWithoutRef } from 'react'
import { ChartConfig } from '@/components/ui/chart'
import { getStreams } from 'apis/youtube/getStreams'
import Chart from './Chart'

const chartConfig = {
  main: {
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

type Props = {
  channelId: string
}

export default async function StreamTimesHistogram({
  channelId
}: PropsWithoutRef<Props>) {
  const streams = await getStreams({
    status: 'ended',
    channelId,
    orderBy: [{ field: 'actualEndTime', order: 'desc' }],
    limit: 50
  })

  if (streams.length === 0) {
    return null
  }

  return <Chart chartConfig={chartConfig} streams={streams} />
}
