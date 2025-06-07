import { Dimension } from 'types/dimension'
import {
  ChannelsRankingPeriod,
  MostCheeredPeriod,
  StreamRankingPeriod,
  TopFansPeriod
} from 'types/period'

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
 * Default URL for `/ranking/most-cheered`
 */
export const MostCheeredDefaultUrl = `/ranking/most-cheered/all/last30Days`

/**
 * Default URL for `/ranking/top-fans`
 */
export const TopFansDefaultUrl = `/ranking/top-fans/all/last30Days`

/**
 * Default URL for `/ranking/super-chat/channels`
 */
export const ChannelsRankingDefaultUrl = `/ranking/super-chat/channels/all/${DefaultPeriodByDimension['super-chat'] as 'last24Hours'}`

/**
 * Default URL for `/ranking/concurrent-viewer/live`
 */
export const StreamRankingDefaultUrl = `/ranking/concurrent-viewer/live/all/${DefaultPeriodByDimension['concurrent-viewer'] as 'realtime'}`
