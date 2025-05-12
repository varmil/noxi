import { Dimension } from 'types/dimension'
import {
  ChannelsRankingPeriod,
  MostCheeredPeriod,
  StreamRankingPeriod,
  TopFansPeriod
} from 'types/period'
import { createSearchParams as createSearchParamsForChannels } from 'utils/ranking/channels-ranking'
import { createSearchParams as createSearchParamsForMostCheered } from 'utils/ranking/most-cheered'
import { createSearchParams as createSearchParamsForStream } from 'utils/ranking/stream-ranking'
import { createSearchParams as createSearchParamsForTopFans } from 'utils/ranking/top-fans'

/**
 * Default Period for each Dimension
 */
export const DefaultPeriodByDimension: Record<
  Dimension,
  | MostCheeredPeriod
  | TopFansPeriod
  | ChannelsRankingPeriod
  | StreamRankingPeriod
> = {
  'concurrent-viewer': 'realtime',
  'most-cheered': 'last30Days',
  'top-fans': 'last30Days',
  'super-chat': 'last24Hours',
  subscriber: 'all'
}

/**
 * Default URL with query string for `/ranking/most-cheered`
 */
export const MostCheeredDefaultUrl = `/ranking/most-cheered?${createSearchParamsForMostCheered(
  {
    period: 'last30Days'
  }
).toString()}`

/**
 * Default URL with query string for `/ranking/top-fans`
 */
export const TopFansDefaultUrl = `/ranking/top-fans?${createSearchParamsForTopFans(
  {
    period: 'last30Days'
  }
).toString()}`

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
