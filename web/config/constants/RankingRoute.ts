import { Dimension } from 'types/dimension'
import { ChannelsRankingPeriod, StreamRankingPeriod } from 'types/period'
import { createSearchParams as createSearchParamsForChannels } from 'utils/ranking/channels-ranking'
import { createSearchParams as createSearchParamsForStream } from 'utils/ranking/stream-ranking'

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
 * Default URL with query string for `/ranking/channels`
 */
export const ChannelsRankingDefaultUrl = `/ranking/channels?${createSearchParamsForChannels(
  {
    dimension: 'super-chat',
    period: DefaultPeriodByDimension['super-chat'] as 'last24Hours'
  }
).toString()}`

/**
 * Default URL with query string for `/ranking/live`
 */
export const StreamRankingDefaultUrl = `/ranking/live?${createSearchParamsForStream(
  {
    dimension: 'concurrent-viewer',
    period: DefaultPeriodByDimension['concurrent-viewer'] as 'realtime'
  }
).toString()}`
