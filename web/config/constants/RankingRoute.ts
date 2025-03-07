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
 * Default URL with query string for `/youtube/channels/ranking`
 */
export const ChannelsRankingDefaultUrl = `/youtube/channels/ranking?${createSearchParamsForChannels(
  {
    dimension: 'super-chat',
    period: DefaultPeriodByDimension['super-chat'] as 'last24Hours'
  }
).toString()}`

/**
 * Default URL with query string for `/youtube/live/ranking`
 */
export const StreamRankingDefaultUrl = `/youtube/live/ranking?${createSearchParamsForStream(
  {
    dimension: 'concurrent-viewer',
    period: DefaultPeriodByDimension['concurrent-viewer'] as 'realtime'
  }
).toString()}`
