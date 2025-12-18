import { getStreamVolumeTrend } from 'apis/youtube/getStreamVolumeTrend'
import { StreamVolumeTrendChart } from './StreamVolumeTrendChart'

type DaysOption = 7 | 28 | 90

interface Props {
  days?: DaysOption
  group?: string
}

export async function StreamVolumeTrendContainer({
  days = 28,
  group
}: Props) {
  const data = await getStreamVolumeTrend({ days, group })

  return <StreamVolumeTrendChart data={data} />
}
