import { Dimension } from 'types/dimension'
import { ChannelsRankingPeriod, StreamRankingPeriod } from 'types/period'

/**
 * Default Period for each Dimension
 */
export const DefaultPeriodByDimension: Record<
  Dimension,
  ChannelsRankingPeriod | StreamRankingPeriod
> = {
  'concurrent-viewer': 'realtime',
  'super-chat': 'last24Hours',
  subscriber: 'all'
}

/**
 * Default URL with query string for `/youtube/channels/ranking`
 */
export const ChannelsRankingDefaultUrl = `/youtube/channels/ranking?${new URLSearchParams(
  {
    period: DefaultPeriodByDimension['super-chat'],
    dimension: 'super-chat'
  }
).toString()}`
