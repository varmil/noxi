import { getActiveHyperTrains } from 'apis/hyper-trains/getHyperTrains'
import { getChannels } from 'apis/youtube/getChannels'
import { HyperTrainTickerClient } from 'components/hyper-train/ticker/HyperTrainTickerClient'

export async function HyperTrainTicker() {
  const trains = await getActiveHyperTrains()
  if (trains.length === 0) return null

  const channels = await getChannels({
    ids: trains.map(t => t.channelId),
    limit: trains.length
  })

  // totalPoint DESC でソート
  const sorted = [...trains].sort((a, b) => b.totalPoint - a.totalPoint)

  return <HyperTrainTickerClient trains={sorted} channels={channels} />
}
