import { getChannelGrowthRankings } from 'apis/youtube/getChannelGrowthRankings'
import { ChannelGrowthRankingChart } from './ChannelGrowthRankingChart'

type DaysOption = 7 | 28 | 90

interface Props {
  days?: DaysOption
  group?: string
}

export async function ChannelGrowthRankingContainer({
  days = 28,
  group
}: Props) {
  const data = await getChannelGrowthRankings({ days, group })

  return <ChannelGrowthRankingChart data={data} />
}
