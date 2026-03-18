import { getSubscriberRankTrend } from 'apis/subscriber-rank-trends/getSubscriberRankTrend'
import { SubscriberRankTrendChart } from './SubscriberRankTrendChart'

interface Props {
  channelId: string
}

export async function SubscriberRankTrendContainer({ channelId }: Props) {
  const data = await getSubscriberRankTrend(channelId)

  return <SubscriberRankTrendChart data={data} />
}
