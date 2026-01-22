import { getConcurrentViewerTrend } from 'apis/insights/getConcurrentViewerTrend'
import { ConcurrentViewerTrendChart } from './ConcurrentViewerTrendChart'

type DaysOption = 7 | 28 | 90

interface Props {
  days?: DaysOption
  group?: string
}

export async function ConcurrentViewerTrendContainer({
  days = 28,
  group
}: Props) {
  const data = await getConcurrentViewerTrend({ days, group })

  return <ConcurrentViewerTrendChart data={data} />
}
