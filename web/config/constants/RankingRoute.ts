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
  'super-chat': 'last30Days',
  subscriber: 'wholePeriod'
}

/**
 * Default URL for `/ranking/most-cheered`
 */
export const MostCheeredDefaultUrl = `/ranking/most-cheered/all/${DefaultPeriodByDimension['most-cheered']}`

/**
 * Default URL for `/ranking/top-fans`
 */
export const TopFansDefaultUrl = `/ranking/top-fans/all/${DefaultPeriodByDimension['top-fans']}`

/**
 * Default URL for `/ranking/super-chat/channels`
 */
export const ChannelsRankingDefaultUrl = `/ranking/super-chat/channels/all/${DefaultPeriodByDimension['super-chat']}`

/**
 * Default URL for `/ranking/concurrent-viewer/live`
 */
export const StreamRankingDefaultUrl = `/ranking/concurrent-viewer/live/all/${DefaultPeriodByDimension['concurrent-viewer']}`
