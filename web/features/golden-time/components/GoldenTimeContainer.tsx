import { getGoldenTimes } from 'apis/youtube/getGoldenTimes'
import { GoldenTimeChart } from './GoldenTimeChart'

type DaysOption = 7 | 28 | 90

interface Props {
  days?: DaysOption
  group?: string
}

export async function GoldenTimeContainer({ days = 28, group }: Props) {
  const data = await getGoldenTimes({ days, group })

  return <GoldenTimeChart data={data} />
}
