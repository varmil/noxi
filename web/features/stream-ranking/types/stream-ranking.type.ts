import { Gender } from 'config/constants/Gender'
import { GroupString } from 'config/constants/Site'

export type StreamRankingPeriod =
  | 'realtime'
  | 'last24Hours'
  | 'last7Days'
  | 'last30Days'
  | 'last1Year'
export type StreamRankingDimension = 'concurrent-viewer' | 'super-chat'

export type StreamRankingSearchParams = {
  period: StreamRankingPeriod
  dimension: StreamRankingDimension
  group?: GroupString
  gender?: Gender
  country?: string
}
