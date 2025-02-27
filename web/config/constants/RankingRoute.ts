import { Dimension } from 'types/dimension'
import { ChannelsRankingPeriod, StreamRankingPeriod } from 'types/period'
import { createSearchParams } from 'utils/ranking/channels-ranking'

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
export const ChannelsRankingDefaultUrl = `/youtube/channels/ranking?${createSearchParams(
  {
    dimension: 'super-chat',
    period: DefaultPeriodByDimension['super-chat'] as 'last24Hours'
  }
).toString()}`
